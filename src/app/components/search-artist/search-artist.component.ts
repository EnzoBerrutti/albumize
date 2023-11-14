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
  albums1: Album[] = []
  albums2: Album[] = []
 

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
        this.getAlbums1();
        this.getAlbums2();

      })
  }

  async getAlbums1() {

    const data = await this.api.getAlbumsWithLimitOffset(this.querySearch,'50' , '0')
    this.albums1 = data['albums']['items']
    this.getAlbumYear(this.albums1)
    this.getDottedName(this.albums1)
  }

  async getAlbums2() {

    const data = await this.api.getAlbumsWithLimitOffset(this.querySearch,'50', '50')
    this.albums2 = data['albums']['items']
    this.getAlbumYear(this.albums2)
    this.getDottedName(this.albums2)
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