import { Component, numberAttribute } from '@angular/core';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  user = {} as User;
  constructor(private userAPI:ServicioUsersService, private formBuilder:FormBuilder, private router: Router){}

  formulario: FormGroup = this.formBuilder.group({
    apellido:['', [Validators.required, Validators.minLength(3)]],
    nombre:['', [Validators.required , Validators.minLength(3)]],
    userName:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]]
  })

  newUser(){

    if(this.formulario.invalid){
      this.formulario.markAllAsTouched()
      return;
    }
  /*   const user: User = {
      nombre:this.formulario.controls['nombre'].value,
      apellido: this.formulario.controls['apellido'].value,
      email: this.formulario.controls['email'].value,
      username: this.formulario.controls['userName'].value,
      password: this.formulario.controls['password'].value,
      id : -1
    } */

    this.user.nombre = this.formulario.controls['nombre'].value;
    this.user.apellido = this.formulario.controls['apellido'].value;
    this.user.email = this.formulario.controls['email'].value;
    this.user.username = this.formulario.controls['userName'].value;
    this.user.password =  this.formulario.controls['password'].value;

    this.userAPI.postUser(this.user);

    this.router.navigate(['home']);
  }

  validar(field: string, error: string){
    return this.formulario.controls[field].getError(error)
    &&
    this.formulario.controls[field].touched;
  }

}
