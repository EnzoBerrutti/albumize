import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksResponse, Track } from 'src/app/interfaces/interfaces';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-album-tracks',
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.css']
})
export class AlbumTracksComponent implements OnInit{

  idAlbum : string = ''
  tracks!:TracksResponse
  tracksWithNumbers: Track [] = []

  constructor(private api:ServicioMusicaService, private ruta:ActivatedRoute){}

  async ngOnInit() {

    this.ruta.params.subscribe(params => {
      this.idAlbum = params["id"]
      this.loadAlbumTracks(this.idAlbum);
    });
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

  msToMinutesAndSeconds(ms: number): string {
    const minutes: number = Math.floor(ms / 60000); // 1 min = 60,000 ms
    const seconds: number = ((ms % 60000) / 1000);
    return `${minutes}:${seconds.toFixed(0).padStart(2, '0')}`;
  }

  addNumbersToTracks(tracks: Track[]) {
    this.tracksWithNumbers = tracks.map((track, index) => ({
      ...track,
      trackNumber: index + 1
    }));
  }

  redirectToSpotify(trackId: string) {
    const spotifyUrl = `https://open.spotify.com/intl-es/track/${trackId}`;
    window.open(spotifyUrl, '_blank');
  }
}
