import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:4000/users";
  user?:User; 
  private id?:number;

  constructor(private http: HttpClient, private router: Router) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined
    //structuredClone(this.user)
   else return { ...this.user };
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  verificarUserAndPass(email: string | undefined, pass: string) {
    this.getUsers().subscribe(users => {
      users.find(u => {
        if (u.password === pass && u.email === email) {
          this.user = u;
   
          localStorage.setItem('token', u.id.toString())
          
        }
      });
    });
  }

  checkStatusAutenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      return of(false)
    }
    return this.http.get<User>(`${this.url}/${token}`)
      .pipe(
        tap(u => this.user = u),
        map(u => !!u),
        catchError(err => of(false))
      )
  }

  logout() {
    this.user = undefined;
    localStorage.clear()
    
  }

}
