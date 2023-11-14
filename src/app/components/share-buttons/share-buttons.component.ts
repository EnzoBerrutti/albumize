import { Component } from '@angular/core';


@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.css']
})
export class ShareButtonsComponent {
  postUrl:String = encodeURI(window.location.href);

  url = 'www.youtube.com'
  title = 'Albumize'
  img = ''

  facebook = `https://www.facebook.com/sharer.php?u=${this.url}`
  whatsapp = `https://wa.me/?text=${this.title}&${this.url}`
  twitter = `https://twitter.com/share?url=${this.url}&text=${this.title}`
  pinterest = `https://pinterest.com/pin/create/bookmarklet/?media=${this.img}&url=${this.url}&is_video=${false}&description=${this.title}`
  linkedin = `https://www.linkedin.com/shareArticle?url=${this.url}&title=${this.title}`
  instagram = ``

}
