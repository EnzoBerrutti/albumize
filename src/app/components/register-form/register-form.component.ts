import { Component, OnInit } from '@angular/core';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  isValidEmail: boolean = false;
  isValidUserName: boolean = false;
  user = {} as User;
  users: User[] = []

  constructor(private userAPI: ServicioUsersService, 
    private formBuilder: FormBuilder, 
    private router: Router) { }

   async ngOnInit() {
      this.users = await this.userAPI.getUsers()
    }
    
  
  formulario: FormGroup = this.formBuilder.group({
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  async newUser() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched()
      return;
    }

    this.user.nombre = this.formulario.controls['nombre'].value;
    this.user.apellido = this.formulario.controls['apellido'].value;
    this.user.email = this.formulario.controls['email'].value;
    this.user.username = this.formulario.controls['userName'].value;
    this.user.password = this.formulario.controls['password'].value;

    this.userAPI.postUser(this.user);

    this.router.navigate(['home']) ;
  }

  validar(field: string, error: string) {
    return this.formulario.controls[field].getError(error)
      &&
      this.formulario.controls[field].touched;
  }

   validarEmail() {
    this.isValidEmail = false
    this.users.forEach((u: User) => {
      if (u.email === this.formulario.controls['email'].value) {
        this.isValidEmail = true
        return
      }
    });
  }

  async validarUserName() {
    this.isValidUserName = false
    this.users.forEach((u: User) => {
      if (u.username === this.formulario.controls['userName'].value) {
        this.isValidUserName = true
        return
      }
    });
  }
}
