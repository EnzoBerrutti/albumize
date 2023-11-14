import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Album, Review, Track, TracksResponse } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-review-form-modification',
  templateUrl: './review-form-modification.component.html',
  styleUrls: ['./review-form-modification.component.css']
})
export class ReviewFormModificationComponent {
  @Input() userReview!:Review;
  album: Album | undefined
  idAlbum: string = ""
  tracks!: TracksResponse
  tracksWithNumbers: Track[] = []
  listaReviews: Review[] = []
  modalTarget: string = "#staticBackdrop";
  review = {} as Review;

  constructor(
    private reviewsDB: ReviewsService,
    private ruta: ActivatedRoute,
    private servicio: ServicioMusicaService,
    private usuarios:ServicioUsersService,
    private router:Router,
    private formBuilder:FormBuilder
  ) { }

  formulario: FormGroup = this.formBuilder.group({
    rating:[7],
    reviewBody:[''],
    favourite:null,
    overrated:null,
    underrated:null,
    worst:null
  });



  getColorForRating(rating: number | null): string {
    if (rating === null || rating === undefined) {
      return 'rgba(0, 0, 0, 1)';
    }

    if (rating < 4) {
      return 'rgb(255, 0, 0)';
    } else if (rating < 7) {
      return 'rgb(203, 208, 42)';
    } else if (rating < 10) {
      return 'rgb(20, 225, 37)';
    } else {
      return '#AC01F8';
    }
  }

  ngOnInit(): void {
    this.ruta.params.subscribe(params => {
      this.idAlbum = params["id"]
      this.loadAlbumTracks(this.idAlbum);

      if (localStorage['token']) {
        this.modalTarget = ''
      }

      this.formulario.patchValue({
        rating: this.userReview.punctuation,
      })

      console.log(this.userReview.review);

      if (this.userReview.review !== undefined && this.userReview.review !== null) {
        this.formulario.patchValue({reviewBody: this.userReview.review}) 
      }

      if (this.userReview.favourite !== undefined && this.userReview.favourite !== null) {
        this.formulario.patchValue({favourite: this.userReview.favourite}) 
      }

      if (this.userReview.overrated !== undefined && this.userReview.overrated !== null) {
        this.formulario.patchValue({overrated: this.userReview.overrated}) 
      }

      if (this.userReview.worst !== undefined && this.userReview.worst !== null) {
        this.formulario.patchValue({worst: this.userReview.worst}) 
      }

      if (this.userReview.underrated !== undefined && this.userReview.underrated !== null) {
        this.formulario.patchValue({underrated: this.userReview.underrated}) 
      }
    });
  }

  async loadAlbumTracks(id: string) {
    try {
      const respuesta = await this.servicio.getAlbumSongs(id);
      this.tracks = respuesta;
      this.addNumbersToTracks(this.tracks.items);
    } catch (error) {
      console.error(error);
    }
  }

  addNumbersToTracks(tracks: Track[]) {
    this.tracksWithNumbers = tracks.map((track, index) => ({
      ...track,
      trackNumber: index + 1
    }));
  }

  validateSelection(fieldName: string, event: any) {
    const selectedIndex = +event;
    console.log(`Validating ${fieldName} with index: ${selectedIndex}`);
  }

  async submitReview() {
    if(localStorage['token']){
      console.log("esta autenticado");

      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;
      
      this.review.albumUrl = this.idAlbum;
      this.review.date = formattedDate;
      this.review.punctuation = this.formulario.controls['rating'].value;
      this.review.review = this.formulario.controls['reviewBody'].value;
      console.log('flag');
      this.review.reviewer =  await this.usuarios.getUserID(localStorage['token']).then(u => u.username);
      this.review.reviewerId = (localStorage['token']);

      this.review.id = this.userReview.id

      this.addOptionalField('favourite', this.review);
      this.addOptionalField('overrated', this.review);
      this.addOptionalField('underrated', this.review);
      this.addOptionalField('worst', this.review);

      console.log(this.review);

      this.reviewsDB.updateReview(this.review)
        .then(() => {
          this.router.navigate(['/album', this.review.albumUrl]);
        })
        .catch(error => {
    console.error('Error al actualizar la revisión:', error);
         });
         }
  }

  limitarLongitudA25(cadena: string): string {
    return cadena.length > 25 ? cadena.substring(0, 25) + '...' : cadena;
  }

  private addOptionalField(fieldName: string, review: Review) {
    const fieldValue: string | number | null = this.formulario.controls[fieldName].value;
    if (fieldValue !== null && fieldValue !== undefined) {
      review[fieldName as keyof Review] = fieldValue as never;
    }
  }

}
