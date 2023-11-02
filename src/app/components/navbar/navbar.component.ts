import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  querySearch:string = "";

  formulario:FormGroup = this.fb.group({
    nombre: ''
  })

  constructor(private fb:FormBuilder, private route:Router){}

  search(){
    this.querySearch = this.formulario.controls['nombre'].value
    this.route.navigate(["/search",this.querySearch])
  }
  irHome(){
    this.route.navigate(['home'])
  }
  irRegister(){
    this.route.navigate(['register'])
  }
  irLogin(){
    this.route.navigate(['login'])
  }
}
