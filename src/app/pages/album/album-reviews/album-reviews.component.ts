import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOut } from 'src/app/animations/animations';
import { Album, Review } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-album-reviews',
  templateUrl: './album-reviews.component.html',
  styleUrls: ['./album-reviews.component.css'],
  animations: [fadeInOut]
})
export class AlbumReviewsComponent implements OnInit {

  album: Album[] = [];
  listaReviews: Review[] = [];
  listaReviewsFiltrada: Review[] = [];
  albumIntroLoaded: boolean = false;
  showButtons:boolean = false;
  showUl:boolean = false;

  constructor(private route: ActivatedRoute, private servicio: ServicioMusicaService, private reviews: ReviewsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const albumId = params.get('id');

      if (albumId) {
        await this.leer();
          this.listaReviewsFiltrada = this.listaReviews.filter(review =>
          review.albumUrl === albumId);
        console.log(this.listaReviewsFiltrada);
      }
    });

    setTimeout(() => {
      this.showButtons = true;
      this.showUl = true;
    }, 430);
  }

  async leer() {
    this.listaReviews = await this.reviews.getReviews();
  }
}