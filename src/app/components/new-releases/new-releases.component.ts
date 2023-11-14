import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Album } from 'src/app/interfaces/interfaces';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
  img: string[] = []
  new_releases: Album[] = []

  new_releases2: Album[] = []


  idArtist = {} as number
  busqueda = {} as string

  active: boolean = false

  formulario: FormGroup = this.fb.group({
    nombre: ''
  })


  constructor(private api:ServicioMusicaService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    const data = await this.api.getNewReleases()
    this.new_releases = await data['albums']['items'].slice(0,4)
    await this.getAlbumYear(this.new_releases)
    await this.getDottedName(this.new_releases)



    this.new_releases2 = await data['albums']['items'].slice(4,8)
    await this.getAlbumYear(this.new_releases2)
    await this.getDottedName(this.new_releases2)

  }

  getAlbumYear(array: Album[]) {
    array.forEach((item) => {
      item.release_date = item.release_date.split("-")[0]
    })
  }

  getDottedName(array: Album[]) {
    array.forEach((item: Album) => {
      if (item.name.length > 10) {
        item.name = item.name.slice(0, 10) + '...'
      }
    })

  }
}
