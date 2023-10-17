import { Component } from '@angular/core';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

interface images {
  height:string,
  url:string,
  width:string
}

interface albums {
  type:string,
  totalTracks:string,
  availableMarkets:string,
  externalsURL:string,
  href:string,
  id:string,
  images:string[],
  name:string,
  releaseDate:string,
  realeaseDatePrecision:string,
  uri:string;
  artists:string[],
  albumGroup: string,
  img:images
}

@Component({
  selector: 'app-hello-and-button',
  templateUrl: './hello-and-button.component.html',
  styleUrls: ['./hello-and-button.component.css']
})
export class HelloAndButtonComponent {

  imgAdele: string[] = []
  albumsAdele:string[] = []

  active:boolean = false

  constructor(private api:ServicioMusicaService){

  }

 /*  async obtenerAdeleImagesAndAlbums(){
    this.active = !this.active;
    const artistID = await this.api.searchArtist()
    const adeleImages = await this.api.getArtist(artistID)
    adeleImages['images'].forEach((element:images) => {
      this.imgAdele.push(element.url)    
    });

    const adeleAlbums = await this.api.getArtistAlbums(artistID)
    adeleAlbums['items'].forEach((element:albums) => {
      this.albumsAdele.push(element.name)
      console.log(element)
      
    });

     this.imgAdele.push(adele[images]) 
    console.log("hello")
  } */
}
