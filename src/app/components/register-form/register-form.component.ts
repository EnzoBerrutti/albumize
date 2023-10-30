import { Component } from '@angular/core';
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

  constructor(private userAPI:ServicioUsersService, private formBuilder:FormBuilder, private router: Router){}

  formulario: FormGroup = this.formBuilder.group({
    apellido:['', [Validators.required, Validators.minLength(3)]],
    nombre:['', Validators.required],
    userName:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required]
  })

  newUser(){

    if(this.formulario.invalid){
      this.formulario.markAllAsTouched()
      return;
    }
    const user: User = {
      apellido: this.formulario.controls['apellido'].value,
      nombre:this.formulario.controls['nombre'].value,
      username: this.formulario.controls['userName'].value,
      email: this.formulario.controls['email'].value,
      password: this.formulario.controls['password'].value
    }

    this.userAPI.postUser(user);

    this.router.navigate(['home']);
  }

  validar(field: string, error: string){
    return this.formulario.controls[field].getError(error)
    &&
    this.formulario.controls[field].touched
  }

}
