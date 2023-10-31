import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.css']
})
export class ProfileReviewsComponent {

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


}
