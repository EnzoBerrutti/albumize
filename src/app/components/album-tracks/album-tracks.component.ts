import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

interface album {

}

@Component({
  selector: 'app-album-tracks',
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.css']
})
export class AlbumTracksComponent implements OnInit{

  idAlbum : string = ''

  constructor(private api:ServicioMusicaService, private ruta:ActivatedRoute){}


  async ngOnInit() {

    this.ruta.params.subscribe(params => {
      this.idAlbum = params["id"]
      console.log(this.ruta.params)
    })
    const data = await this.api.getAlbumByID(this.idAlbum) 
    console.log(data)
  }

}
