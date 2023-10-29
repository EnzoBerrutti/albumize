import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album, Review } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-album-intro',
  templateUrl: './album-intro.component.html',
  styleUrls: ['./album-intro.component.css']
})
export class AlbumIntroComponent implements OnInit{

  album: Album | undefined
  listaReviews: Review[] = []
  score:number | String = 0

  constructor(private route:ActivatedRoute,private servicio:ServicioMusicaService,private reviewsService:ReviewsService){}

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const albumId = params.get('id');

      if(albumId){
        this.album = await this.servicio.getAlbumByID(albumId)
        await this.leer()
        if(this.listaReviews){
          this.score = this.calcularScore(this.listaReviews,albumId)
        }
      }
    });
  }

  async leer(){
    this.listaReviews = await this.reviewsService.getReviews()
    console.log(this.listaReviews);
  }

  calcularScore(reviews: Review[], albumUrl: string): number | string {
    const filteredReviews = reviews.filter(review => review.albumUrl === albumUrl);
  
    if (filteredReviews.length === 0) {
      return "ND";
    }
  
    const totalScore = filteredReviews.reduce((accumulator, review) => accumulator + review.punctuation, 0);
    const averageScore = totalScore / filteredReviews.length;
  
    return parseFloat(averageScore.toFixed(1));
  }
}
