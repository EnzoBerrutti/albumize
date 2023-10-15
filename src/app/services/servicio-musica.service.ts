import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ServicioMusicaService {

  urlSpotifyToken:string = 'https://accounts.spotify.com/api/token'
  clientID:string = 'd97b7a83e7a940638f380d1efcb63b5f'
  clientSecret:string = 'fd634a32c1904ade834f5897cc52c6fd'
  paramsToken:string = "?grant_type=client_credentials&client_id=" + this.clientID + "&client_secret=" + this.clientSecret
  
  header = { "Content-type" : 'application/x-www-form-urlencoded'} //No funciona todavia
  urlSpotifyRequests: string = 'https://api.spotify.com/v1'

  searchParams1:string = '?q=Adele&type=artist&market=US&limit=2' // Codigo recontra hardcodeado 
  searchParams2:string = '/albums?include_groups=single&market=US&limit=10' // Codigo recontra hardcodeado
  
  async getTokenSpotify(){
    try {
       const request = await fetch(this.urlSpotifyToken + this.paramsToken, {
        method: 'POST',
        headers: {
          "Content-type" : 'application/x-www-form-urlencoded'
        }
    });
      const data = await request.json()
      const token = await data['access_token']
      return token;
 
    } catch (error) {
      console.log(error)      
    }
  } 
  
  
  async searchArtist(){
    try {
      const token = await this.getTokenSpotify()
      console.log(token)
      const request = await fetch(this.urlSpotifyRequests + '/search/' + this.searchParams1,{
        headers : {"Authorization" : "Bearer  " + token }
      })
      const data = await request.json()
      const artistId = await data['artists']['items'][0]['id']
      return artistId
    } catch (error) {
      console.log(error)
    }
  }

  async getArtist(artistId:string){
    try {
      const token = await this.getTokenSpotify()
      const request = await fetch(this.urlSpotifyRequests + '/artists/' + artistId ,{
        headers : {"Authorization" : "Bearer  " + token }
      })
      const data = await request.json()
      return data
    } catch (error) {
      console.log(error)
    }

  }

  async getArtistAlbums(artistId:string){
    try {
      const token = await this.getTokenSpotify()
      const request = await fetch(this.urlSpotifyRequests + '/artists/' + artistId +  this.searchParams2,{
        headers : {"Authorization" : "Bearer  " + token }
      })
      const data = await request.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  /* ESTO ES CODIGO DE LA API DE SHAZAM ANTES DE QUE FUNCIONARA LA API DE SPOTIFY */
  urlShazam: string = 'https://shazam.p.rapidapi.com/search?term=hello&locale=en-US&offset=0&limit=5';

  constructor(private http: HttpClient) { }

  async searchSongORArtist(){
    try {
      const request = await fetch(this.urlShazam, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd92d15d437msh5605811bbf98ecap17f2e0jsncc792d61e177'
          /*'X-RapidAPI-Host': 'shazam.p.rapidapi.com'*/
        }
    });
      const data = await request.json()
      return data;

    } catch (error) {
      console.log(error)      
    }
  } 
}
