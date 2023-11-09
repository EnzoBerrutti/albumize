import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component {
  querySearch:string = "";

  formulario:FormGroup = this.fb.group({
    nombre: ''
  })

  constructor(private fb:FormBuilder, private router:Router, private auth: AuthService){}

  search(){
    this.querySearch = this.formulario.controls['nombre'].value
    this.router.navigate(["/search",this.querySearch])
  }
  irHome(){
    this.router.navigate(['home'])
  }
  irRegister(){
    this.router.navigate(['register'])
  }
  irLogin(){
    this.router.navigate(['login'])
  }

  onLogout(){
    this.auth.logout();
    this.router.navigate(['home'])
  }
}
