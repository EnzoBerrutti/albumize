import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOut } from 'src/app/animations/animations';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css'],
  animations: [fadeInOut]
})
export class AlbumInfoComponent implements OnInit{

  idAlbum:String=""

  showButtons:boolean = false;

  constructor(private ruta:ActivatedRoute){}

  async ngOnInit() {

    this.ruta.params.subscribe(params => {
      this.idAlbum = params["id"]
    });

    setTimeout(() => {
      this.showButtons = true;
    }, 430);
  }
}
