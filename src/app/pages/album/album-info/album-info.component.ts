import { Component, OnInit } from '@angular/core';
import { fadeInOut } from 'src/app/animations/animations';
import { Review } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css'],
  animations: [fadeInOut]
})
export class AlbumInfoComponent implements OnInit {

  constructor(
    private reviewsService: ReviewsService,
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