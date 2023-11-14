import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  allReviewsRendered = false;
  originalOrder: Review[] = [];
  reversedOrder: Review[] = [];

  formulario:FormGroup = this.fb.group({
    selectedSort : 'opcion1'
  })

  constructor(private activatedRoute:ActivatedRoute,
              private userAPI: ServicioUsersService,
              private reviewsDB: ReviewsService,
              private fb: FormBuilder){}

 async ngOnInit() {
    this.activatedRoute.params.subscribe((params:Params) =>{
      this.idUser = +params['idUser']})
      this.user = await this.userAPI.getUserID(this.idUser);

      const allreviews = await this.reviewsDB.getReviews()

      console.log(allreviews)

      this.reviewsArray = await allreviews.filter((r:Review) => +r.reviewerId === this.user.id)
      console.log(this.reviewsArray)

      this.originalOrder = [...this.reviewsArray]
      this.reversedOrder = [...this.reviewsArray.reverse()]

      this.sortByMostRecent()
      
  }

  onSortBy() {
    const selectedSort = this.formulario.controls['selectedSort'].value;
  
    switch (selectedSort) {
      case 'opcion1':
        this.sortByMostRecent();
        break;
      case 'opcion2':
        this.sortByOldest();
        break;
      case 'opcion3':
        this.sortFromHighToLow();
        break;
      case 'opcion4':
        this.sortFromLowToHigh();
        break;
    }
  }

  sortFromHighToLow() {
    this.reviewsArray.sort((a, b) => b.punctuation - a.punctuation);
  }

  sortFromLowToHigh() {
    this.reviewsArray.sort((a, b) => a.punctuation - b.punctuation);
  }

  sortByMostRecent() {
    this.reviewsArray = [...this.reversedOrder];
  }
  
  sortByOldest() {
    this.reviewsArray = [...this.originalOrder];
  }

  onLastReviewRendered(){
    this.allReviewsRendered= true;
  }

}
