import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-album-modify-review',
  templateUrl: './album-modify-review.component.html',
  styleUrls: ['./album-modify-review.component.css']
})
export class AlbumModifyReviewComponent {

  constructor(
    private reviewsService: ReviewsService,
    private users: ServicioUsersService,
    private route:ActivatedRoute
  ) {}

  showButtons: boolean = false;
  reviewsList: Review[] = [];
  userReviews: Review[] = [];
  userReview!: Review;
  hasReview: boolean = false;
  userId: number = -1;
  reviewerId: number = -1;
  albumId: string | null = null

  async ngOnInit() {

    this.route.paramMap.subscribe(async params => {
      this.albumId = params.get('id');

      if (this.albumId) {

         const token = localStorage.getItem('token');
         this.userId = token ? parseInt(token, 10) : -1;
         console.log(this.userId);

         this.reviewsList = await this.reviewsService.getReviews()

        this.userReviews = this.reviewsList.filter(review => review.reviewerId == this.userId);

        this.userReview = this.userReviews.find(review => review.albumUrl == this.albumId) as Review;

        if(this.userReview === undefined)
        {
            this.hasReview = false
        }
        else
        {
          this.hasReview = true
        }

       setTimeout(() => {
          this.showButtons = true;
        }, 430);
      }
    });
}

}
