import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ServicioMusicaService {

  urlShazam: string = 'https://shazam.p.rapidapi.com/search?term=hello&locale=en-US&offset=0&limit=5';

  constructor(private http: HttpClient) { }

  async searchSongORArtist(){
    try {
      const request = await fetch(this.urlShazam, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd92d15d437msh5605811bbf98ecap17f2e0jsncc792d61e177',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    });
      const data = await request.json()
      return data;

    } catch (error) {
      console.log(error)      
    }
  } 
}
