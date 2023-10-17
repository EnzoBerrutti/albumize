import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  images:images[],
  name:string,
  release_date:string,
  realeaseDatePrecision:string,
  uri:string;
  artists:string[],
  albumGroup: string,
}

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css']
})
export class SearchArtistComponent {
  img: string[] = []
  albums:albums[] = []

  casa!:string 
  idArtist = {} as number
  
  active:boolean = false
  formulario:FormGroup = this.fb.group({
    nombre: ''
  })

  constructor(private api:ServicioMusicaService,
              private fb:FormBuilder){}


  async searchArtistName(){
    this.albums = []
    if(!this.active){
      this.active = !this.active

      const artistName = this.formulario.controls['nombre'].value
      console.log(artistName)
      
      this.idArtist = await this.api.searchArtist(artistName)
      console.log(this.idArtist)
    } else{
      this.active = !this.active
    }
  }

  async getArtistAlbums(){
    await this.searchArtistName()

    const objeto = await this.api.getArtistAlbums(this.idArtist)
    
    console.log(objeto)
    
    console.log(objeto['items'])
    objeto['items'].forEach((element:albums) => {
      this.albums.push(element)
    })

    console.log(this.albums[0].images[0].url)

  }


}
