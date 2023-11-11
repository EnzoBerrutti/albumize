import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Review, User } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.css']
})
export class ProfileReviewsComponent {

  idUser = {} as number;
  user = {} as User;

  reviewsArray:Review[] = []

  constructor(private activatedRoute:ActivatedRoute,
              private userAPI: ServicioUsersService,
              private reviewsDB: ReviewsService){

  }
 async ngOnInit() {
    this.activatedRoute.params.subscribe((params:Params) =>{
      this.idUser = +params['idUser']})
      this.user = await this.userAPI.getUserID(this.idUser);

      const allreviews = await this.reviewsDB.getReviews()
      this.reviewsArray = allreviews.filter((r:Review) => r.reviewer === this.user.username)
      console.log(this.reviewsArray)
  }

}
