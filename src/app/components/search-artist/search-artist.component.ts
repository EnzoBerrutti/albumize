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
  

  idArtist = {} as number
  busqueda = {} as string

  querySearch: string = ''

  constructor(
    private api: ServicioMusicaService,
    private activatedRoute: ActivatedRoute
    ) {}

  async ngOnInit() {
    this.albums = []
      this.activatedRoute.params.subscribe((params: Params) => {
        this.querySearch = params['query']
        this.getAlbums('50', '0');
        this.getAlbums('50', '50');

      })
  }

  async getAlbums(limit:string, offset:string) {

    const data = await this.api.getAlbumsWithLimitOffset(this.querySearch, limit, offset)
    console.log(data['albums']['items'])
    this.albums = [...this.albums, ...data['albums']['items']]
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