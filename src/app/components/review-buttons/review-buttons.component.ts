import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonVariablesService } from 'src/app/services/common-variables.service';

@Component({
  selector: 'app-review-buttons',
  templateUrl: './review-buttons.component.html',
  styleUrls: ['./review-buttons.component.css']
})
export class ReviewButtonsComponent implements OnInit{

  idAlbum:String=""
  selectedChoice:string = 'option1'

  formulario:FormGroup = this.fb.group({
    selectedSort : null
  })

  constructor(private ruta:ActivatedRoute,
              private fb:FormBuilder,
              public cv:CommonVariablesService){}

  async ngOnInit() {

    this.ruta.params.subscribe(params => {
      this.idAlbum = params["id"]
    });


      this.formulario = this.fb.group({
        selectedSort: 'opcion1' // Set the default value here
      });

  }

  onSortBy(event:Event){
    this.cv.selectedSortOption = this.formulario.controls['selectedSort'].value
    console.log(this.cv.selectedSortOption)
  }

}
