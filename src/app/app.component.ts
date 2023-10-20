import { Component } from '@angular/core';
import { ServicioMusicaService } from './services/servicio-musica.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'albumize';

  constructor(private api:ServicioMusicaService){}
}
