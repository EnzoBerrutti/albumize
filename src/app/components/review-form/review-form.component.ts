import { Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Album, Review, Track, TracksResponse } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  album: Album | undefined
  idAlbum: string = ""
  tracks!: TracksResponse
  tracksWithNumbers: Track[] = []
  listaReviews: Review[] = []
  modalTarget: string = "#staticBackdrop";

  constructor(
    private reviewsDB: ReviewsService,
    private formBuilder:FormBuilder,
    private ruta: ActivatedRoute,
    private servicio: ServicioMusicaService,
    private usuarios:ServicioUsersService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  reviewForm: FormGroup = new FormGroup({
    rating: new FormControl(7),
    reviewBody: new FormControl(''),
    favourite: new FormControl(null),
    overrated: new FormControl(null),
    underrated: new FormControl(null),
    worst: new FormControl(null)
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

      const review : Review = {
        review: this.reviewForm.controls['reviewBody'].value,
        albumUrl: this.idAlbum,
        punctuation: this.reviewForm.controls['rating'].value,
        reviewer: await this.usuarios.getUserID(localStorage['token']).then(u => u.username),
        date: formattedDate,
        reviewerId: (localStorage['token'])
      }

      this.addOptionalField('favourite', review);
      this.addOptionalField('overrated', review);
      this.addOptionalField('underrated', review);
      this.addOptionalField('worst', review);

      this.reviewsDB.postReview(review)
    }

  }

  limitarLongitudA25(cadena: string): string {
    return cadena.length > 25 ? cadena.substring(0, 25) + '...' : cadena;
  }

  private addOptionalField(fieldName: string, review: Review) {
    const fieldValue: string | number | null = this.reviewForm.controls[fieldName].value;
    if (fieldValue !== null && fieldValue !== undefined) {
      review[fieldName as keyof Review] = fieldValue as never; // o fieldValue as string | number si es aplicable a tu caso
    }
  }
}