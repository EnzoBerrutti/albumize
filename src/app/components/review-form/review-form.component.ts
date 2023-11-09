import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Album, Review, Track, TracksResponse } from 'src/app/interfaces/interfaces';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  album: Album | undefined
  idAlbum:string=""
  tracks!:TracksResponse
  tracksWithNumbers: Track [] = []
  listaReviews: Review[] = []
  selectedFavouriteIndex: any = -1;
  selectedLeastFavouriteIndex: any = -1;
  selectedOverratedIndex: any = -1;
  selectedUnderratedIndex: any = -1;

  constructor(private ruta:ActivatedRoute,private servicio:ServicioMusicaService){}

  reviewForm: FormGroup = new FormGroup({
    rating: new FormControl(7),
    reviewBody: new FormControl('')
  });

  getColorForRating(rating: number | null): string {
    if (rating === null || rating === undefined) {
      return 'rgba(0, 0, 0, 1)';
    }
  
    if (rating < 4) {
      return 'rgb(255, 0, 0)';
    } else if (rating < 7) {
      return 'rgb(203, 208, 42)';
    } else if (rating < 10){
      return 'rgb(20, 225, 37)';
    } else{
      return 'rgb(23, 162, 255)';
    }
  }

  ngOnInit(): void {
    this.ruta.params.subscribe(params => {
      this.idAlbum = params["id"]
      this.loadAlbumTracks(this.idAlbum);
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

  submitReview() {
    
  }
}