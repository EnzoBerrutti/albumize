import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album, Review, Track, TracksResponse } from 'src/app/interfaces/interfaces';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-already-has-a-review',
  templateUrl: './already-has-a-review.component.html',
  styleUrls: ['./already-has-a-review.component.css']
})
export class AlreadyHasAReviewComponent {
  @Input() userReview!: Review;
  album!: Album
  idAlbum: string = ""
  tracks!: TracksResponse
  tracksWithNumbers: Track[] = []
  listaReviews: Review[] = []
  modalTarget: string = "#staticBackdrop";

  constructor(
    private ruta: ActivatedRoute,
    private servicio: ServicioMusicaService,
    private api: ServicioMusicaService,
  ) { }

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      this.idAlbum = params["id"];
  
      this.loadAlbumTracks(this.idAlbum).then(() => {
        this.api.getAlbumByID(this.idAlbum)
          .then(album => {
            this.album = album;
          })
          .catch(error => {
            console.error(error);
          });
      });
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
}
