import { Component } from '@angular/core';
import { ServicioMusicaService } from './servicios/servicio-musica.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'albumize';

  constructor(private api:ServicioMusicaService){}

  fetchResults():void {
    this.api.searchSongORArtist().then(result=>{
      console.log(result)
    })
  }
}
