import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review, Track, TracksResponse, Album } from 'src/app/interfaces/interfaces';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-review-in-album-page',
  templateUrl: './review-in-album-page.component.html',
  styleUrls: ['./review-in-album-page.component.css']
})
export class ReviewInAlbumPageComponent {
  @Input() review!: Review;
  idAlbum : string = ''
  tracks!:TracksResponse
  tracksWithNumbers: Track [] = []
  albumImg?:string;


  constructor(private api:ServicioMusicaService, private ruta:ActivatedRoute){}

  async ngOnInit() {
    this.ruta.params.subscribe(params => {
      this.idAlbum = params["id"]
      this.loadAlbumTracks(this.idAlbum);
    });

    const album:Album = await this.api.getAlbumByID(this.idAlbum)
    this.albumImg = album.images[0].url

    


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
};




