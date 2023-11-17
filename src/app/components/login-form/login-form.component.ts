import { identifierName } from '@angular/compiler';
import { Component, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  isHidden:boolean = false;
  passwordVisible: boolean = false;
  constructor(private fb:FormBuilder,
              private auth: AuthService,
              private router:Router){}



  formLogin:FormGroup = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  })

  // Aparece y desaparece el contenido del password
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;

  }

  // Funcion de logueo
  onLogin(){

    console.log(localStorage.getItem('token'))
    this.isHidden = false
    if(this.formLogin.invalid) 
    {
      return
    }

    this.auth.verificarUserAndPass(
      this.formLogin.controls['email'].value,
      this.formLogin.controls['password'].value
      )
      
      if(localStorage.getItem('token')===null){
        this.isHidden = true
      }
      
  }


}
