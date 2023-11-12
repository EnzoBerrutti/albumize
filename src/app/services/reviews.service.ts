import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  url:string = "http://localhost:4000/reviews"

  constructor(private router:Router) { }

  async getReviews(){
    try{
      const resultado = await fetch(this.url)
      const reviews = await resultado.json()
      return reviews;
    }catch(err){
      console.log(err)
    }
    return undefined
  }

  async postReview(review:Review){
    try{
      await fetch(this.url,
            {
              method:'POST',
              body:JSON.stringify(review),
              headers: {"Content-type": "application/json"}
            })

    }catch(err){
      console.log(err);
    }
  }

  async deleteReview(id:number){
    try{
      await fetch(`${this.url}/${id}`,
                  {
                    method:"DELETE",
                  })

      window.location.reload()

    }catch(err){
      console.log(err);
    }
  }

  async getReview(id:number){
    try{
        const resultado = await fetch(`${this.url}/${id}`)
        const review = await resultado.json();
        return review;
    }catch(error){
      console.log(error);
    }

    return undefined;
  }

  async updateReview(review: Review) {
    try {
      await fetch(`${this.url}/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review),
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.log(error);
    }
  }
}
