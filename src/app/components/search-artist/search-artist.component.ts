import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from 'src/app/interfaces/interfaces';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css']
})
export class SearchArtistComponent implements OnInit {
  img: string[] = []
  albums: Album[] = []
  
  maxSize:number = 6;
  public page!:number

  idArtist = {} as number
  busqueda = {} as string

  querySearch: string = ''

  constructor(
    private api: ServicioMusicaService,
    private activatedRoute: ActivatedRoute
    ) {}

  async ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.querySearch = params['query']
        this.albums = []
        this.getAlbums();


      })
  }

  async getAlbums() {

    const data1 = await this.api.getAlbumsWithLimitOffset(this.querySearch,'50' , '0')
    const data2 = await this.api.getAlbumsWithLimitOffset(this.querySearch,'50' , '50')
    this.albums = [...data1['albums']['items'], ...data2['albums']['items']];
    
    this.getAlbumYear(this.albums)
    this.getDottedName(this.albums)
  }


  getAlbumYear(array: Album[]) {
    array.forEach((item) => {
      item.release_date = item.release_date.split("-")[0]
    })
  }

  getDottedName(array: Album[]) {
    array.forEach((item: Album) => {
      if (item.name.length > 12) {
        item.name = item.name.slice(0, 12) + '...'
      }
    })
  }
  
}