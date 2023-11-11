import { Component, OnInit } from '@angular/core';
import { ServicioMusicaService } from './services/servicio-musica.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'albumize';

  notLogged = true
  logged = false

ngOnInit() {
  if(!localStorage['token']){
    this.logged = false
    this.notLogged = true
  }
  else{
    this.logged = true
    this.notLogged = false
  }
}

  constructor(private api:ServicioMusicaService){}

}
