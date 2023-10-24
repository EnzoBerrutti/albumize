import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ServicioMusicaService {

  // CREDENTIALS FOR API SPOTIFY TOKEN
  urlSpotifyToken:string = 'https://accounts.spotify.com/api/token'
  clientID:string = 'd97b7a83e7a940638f380d1efcb63b5f'
  clientSecret:string = 'fd634a32c1904ade834f5897cc52c6fd'
  paramsToken:string = "?grant_type=client_credentials&client_id=" + this.clientID + "&client_secret=" + this.clientSecret
  
  // CREDENTIALS FOR QUERIES
  header = { "Content-type" : 'application/x-www-form-urlencoded'} //No funciona todavia
  urlSpotifyRequests: string = 'https://api.spotify.com/v1'

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
  

  async getAlbums(querySearch:string){
    try {
      const token = await this.getTokenSpotify()
      const request = await fetch(`${this.urlSpotifyRequests}/search?q=${querySearch}&type=album`, {
        headers : {"Authorization" : "Bearer  " + token }
      })
      const response = request.json()
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async getAlbumByID(id:string){
    try {
      const token = await this.getTokenSpotify()
      const request = await fetch(`${this.urlSpotifyRequests}/albums/${id}`, {
        headers : {"Authorization" : "Bearer  " + token }
      })
      const response = request.json()
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async getNewReleases(){
    try {
      const token = await this.getTokenSpotify()
      const request = await fetch(`${this.urlSpotifyRequests}/browse/new-releases`, {
        headers : {"Authorization" : "Bearer  " + token }
      })
      const response = request.json()
      return response
    } catch (error) {
      console.log(error)
    }
  }

}
