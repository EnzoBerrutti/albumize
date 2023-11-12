import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit{
  querySearch:string = "";

  user?:User;
  idLocal?:number;

  formulario:FormGroup = this.fb.group({
    nombre: ''
  })

  constructor(private fb:FormBuilder, 
    private router:Router, 
    private auth: AuthService,
    private userService: ServicioUsersService){}

    async ngOnInit() {
      this.idLocal = parseInt(localStorage['token'])
      this.user = await this.userService.getUserID(this.idLocal) 
    }
  
    search(){
    this.querySearch = this.formulario.controls['nombre'].value
    this.router.navigate(["/search",this.querySearch])
  }
  irHome(){
    this.router.navigate(['home'])
  }


/*   onLogout(){
    this.auth.logout();
    this.router.navigate(['home'])
    window.location.reload()
  } */

  onLogout() {
    // Navega a la ruta "about"
    this.auth.logout();
    this.router.navigate(['home'])
      .then(() => {
        // Espera 100 milisegundos (ajusta según sea necesario) y luego recarga la página
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
}
}
