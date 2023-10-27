import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Album } from 'src/app/interfaces/interfaces';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css']
})
export class SearchArtistComponent implements OnInit{
  img: string[] = []
  albums: Album[] = []
  new_releases: Album[] = []

  idArtist = {} as number

  active: boolean = false
  formulario: FormGroup = this.fb.group({
    nombre: ''
  })

  constructor(private api: ServicioMusicaService,
    private fb: FormBuilder) { }

    async ngOnInit(){
      console.log("Hello")
      const data = await this.api.getNewReleases()
      this.new_releases = data['albums']['items']
      this.getAlbumYear(this.new_releases)
      this.getDottedName(this.new_releases)
      console.log(this.new_releases)
    }

  async getAlbums() {
    this.albums = []
    this.active = !this.active
    const query = this.formulario.controls['nombre'].value
    const data = await this.api.getAlbums(query)
    this.albums = data['albums']['items']
    this.getAlbumYear(this.albums)
    this.getDottedName(this.albums)
    console.log(this.albums)

  }

getAlbumYear(array:Album[]){
  array.forEach((item)=>{
    item.release_date = item.release_date.split("-")[0]
  })
}

getDottedName(array:Album[]){
  array.forEach((item:Album)=>{
    if(item.name.length > 12){
      item.name = item.name.slice(0,12) + '...'
    }
  })
  
}

}