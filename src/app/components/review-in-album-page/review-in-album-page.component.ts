import { Component,Input, OnInit } from '@angular/core';
import { Review } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-review-in-album-page',
  templateUrl: './review-in-album-page.component.html',
  styleUrls: ['./review-in-album-page.component.css']
})
export class ReviewInAlbumPageComponent {
  @Input() review!: Review;
};
