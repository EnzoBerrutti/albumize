import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsersService {

  url = "http://localhost:4000/users"
  
  constructor() { }

  async getUsers() {
    try {
      const request = await fetch(this.url)
      const data = await request.json();
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getUserID(id: number) {
    try {
      const request = await fetch(this.url + `/${id}`)
      const data = request.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async postUser(user: User) {
    try {
      await fetch(this.url,
        {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json' }
        })
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(userId: number | undefined) {
    try {
      await fetch(`${this.url}/${userId}`, {
        method: "DELETE"
      })
    } catch (error) {
      console.log(error)
    }
  }

  async putUser(user: User) {
    try {
      await fetch(`${this.url}/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json"
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}