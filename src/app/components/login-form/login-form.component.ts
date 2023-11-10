import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  isHidden:boolean = false;
  constructor(private fb:FormBuilder,
              private auth: AuthService){}

  formLogin:FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  onLogin(){
    if(this.formLogin.invalid) return;

    this.isHidden = !this.isHidden
    this.auth.verificarUserAndPass(
    this.formLogin.controls['email'].value,
    this.formLogin.controls['password'].value
    )

  }


}
