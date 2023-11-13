import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album, Review, Track, TracksResponse } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-review-in-profile-page',
  templateUrl: './review-in-profile-page.component.html',
  styleUrls: ['./review-in-profile-page.component.css']
})
export class ReviewInProfilePageComponent {

  @Input() review!: Review;
  idAlbum : string = ''
  tracks!:TracksResponse
  tracksWithNumbers: Track [] = []
  albumImg?:string;
  album!:Album 

  constructor(private api:ServicioMusicaService, private ruta:ActivatedRoute, private reviewDB:ReviewsService){}

  async ngOnInit() {
    
    this.idAlbum = this.review.albumUrl
    this.album = await this.api.getAlbumByID(this.idAlbum)
    this.albumImg = this.album.images[0].url
    await this.loadAlbumTracks(this.idAlbum)
  }

  async loadAlbumTracks(id: string) {
    try {
      const respuesta = await this.api.getAlbumSongs(id);
      this.tracks = respuesta
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

   deleteReview(){
    console.log(this.review.id)
  this.reviewDB.deleteReview(this.review.id)
  }

}
