import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit{

  isReadOnly:boolean = true
  idUser = {} as number;
  user = {} as User;

  constructor(private activatedRoute:ActivatedRoute,
              private userAPI: ServicioUsersService){

  }
 async ngOnInit() {
    this.activatedRoute.params.subscribe((params:Params) =>{
      this.idUser = +params['idUser']})
      this.user = await this.userAPI.getUserID(this.idUser);
  }

  modificarUser(){
    this.isReadOnly = !this.isReadOnly
  }


}
