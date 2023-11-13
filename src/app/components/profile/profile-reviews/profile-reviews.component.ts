import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Review, User } from 'src/app/interfaces/interfaces';
import { CommonVariablesService } from 'src/app/services/common-variables.service';
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
      

      this.reviewsArray = await allreviews.filter((r:Review) => r.reviewer === this.user.username)

      this.sortByMostRecent();

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
      default:
        this.sortByMostRecent();
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
    this.reviewsArray.sort((a, b) => this.compareDates(b.date, a.date));
  }
  
  sortByOldest() {
    this.reviewsArray.sort((a, b) => this.compareDates(a.date, b.date));
  }
  
  private compareDates(date1: string, date2: string): number {
    const parsedDate1 = this.parseDateString(date1);
    const parsedDate2 = this.parseDateString(date2);
  
    return +parsedDate1 - +parsedDate2;
  }
  
  private parseDateString(dateString: string): Date {
    const [month, day, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

}
