import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-buttons',
  templateUrl: './review-buttons.component.html',
  styleUrls: ['./review-buttons.component.css']
})
export class ReviewButtonsComponent implements OnInit{

  idAlbum:String=""

  constructor(private ruta:ActivatedRoute){}

  async ngOnInit() {

    this.ruta.params.subscribe(params => {
      this.idAlbum = params["id"]
    });
  }

}
