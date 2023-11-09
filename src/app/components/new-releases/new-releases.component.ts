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
    this.new_releases = data['albums']['items']
    this.getAlbumYear(this.new_releases)
    this.getDottedName(this.new_releases)
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
