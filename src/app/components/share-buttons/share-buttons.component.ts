import { Component } from '@angular/core';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.css']
})
export class ShareButtonsComponent {
  postUrl:String = encodeURI(window.location.href);

  url = 'www.youtube.com'
  facebook = `https://www.facebook.com/sharer.php?u=${this.url}`

  ngOnInit(){
    /* console.log(this.postUrl) */
    console.log(this.facebook)
    
  }
  /* 
  Social Share Links:
  */
    postFacebook(){
      this.facebook = `https://www.facebook.com/sharer.php?u=${this.url}`
    }

    postInstagram(){

    }
    postWhatsapp(){

/*       WhatsApp:
      https://wa.me/?text=[post-title] [post-url] */
    }
    
    postTwitter(){
/*       Twitter:
      https://twitter.com/share?url=[post-url]&text=[post-title] */
    }
    
    postPinterest(){
  /*     Pinterest:
      https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&is_video=[is_video]&description=[post-title] */
    }
    
    postLinkedIn(){
 /*      LinkedIn:
      https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title] */
    }
    
          



}
