import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  isHidden:boolean = false;
  constructor(private fb:FormBuilder,
              private auth: AuthService,
              private router:Router){}

  formLogin:FormGroup = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  })

  onLogin(){
    this.isHidden = false
    if(this.formLogin.invalid) 
    {
      return
    }

    this.auth.verificarUserAndPass(
    this.formLogin.controls['email'].value,
    this.formLogin.controls['password'].value
    )

    if(localStorage['token']){
      window.location.reload()
      this.router.navigate(['home'])
    }
    else{
      this.isHidden = true
    }
  }
}
