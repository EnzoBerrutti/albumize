import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Review, User } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {
  preview:string = ''
  imagenCapturada: any = []
  hayFoto: boolean = true
  isReadOnly: boolean = true
  idUser = {} as number;
  user = {} as User;
  isValidUserName:boolean = false

  formulario: FormGroup = this.formbuilder.group({
    apellido: ['', [Validators.minLength(3)]],
    nombre: ['', [Validators.minLength(3)]],
    userName: [''],
    email: ['', [Validators.email]],
  })

  constructor(private activatedRoute: ActivatedRoute,
    private userAPI: ServicioUsersService,
    private formbuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private reviewDB:ReviewsService) {

  }
  async ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idUser = +params['idUser']
    })
    this.user = await this.userAPI.getUserID(this.idUser);

    if (this.user.nombre !== undefined && this.user.nombre !== null) {
      this.formulario.patchValue({nombre: this.user.nombre}) 
    }

    if (this.user.apellido !== undefined && this.user.apellido !== null) {
      this.formulario.patchValue({apellido: this.user.apellido}) 
    }

    if (this.user.email !== undefined && this.user.email !== null) {
      this.formulario.patchValue({email: this.user.email}) 
    }

    if (this.user.username !== undefined && this.user.username !== null) {
      this.formulario.patchValue({userName : this.user.username}) 
    }
  }
  


  modificarUser() {
    this.isReadOnly = !this.isReadOnly
  }

  capturarFile(event: any) {
   

      const archivo = event.target.files[0];
      this.extraerbase64(archivo).then((img:any)  => 
      this.preview = img.base)
      this.imagenCapturada.push(archivo); 
  

  }

  extraerbase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader()
      reader.readAsDataURL($event)
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      }
      reader.onerror = error => {
        resolve({
          base: null

        })
      };
    } catch (error) {
      console.log(error)
    }
  })

  subirArchivo():any{
    try {
      const formularioDeDatos = new FormData();
      console.log(this.imagenCapturada[0])
      this.imagenCapturada.forEach((archivo:string) => {
        console.log("hola")
        formularioDeDatos.append('files', archivo)
      })
      console.log(formularioDeDatos)
    } catch (error) {
      
    }
  }
  async guardarCambios() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched()
      console.log("hola")
      return;
    }

   await this.validarUserName()
    if(this.isValidUserName){
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
    this.user.nombre = this.formulario.controls['nombre'].touched ? this.formulario.controls['nombre'].value : this.user.nombre;
    this.user.apellido = this.formulario.controls['apellido'].touched ? this.formulario.controls['apellido'].value : this.user.apellido;
    this.user.email = this.formulario.controls['email'].touched ? this.formulario.controls['email'].value : this.user.email;
    this.user.username = this.formulario.controls['userName'].touched ? this.formulario.controls['userName'].value : this.user.username;

    console.log(this.user)
    this.userAPI.putUser(this.user);
    this.isReadOnly = !this.isReadOnly


    const arrayReviews :Review[] = await this.reviewDB.getReviews()
    arrayReviews.forEach((r:Review)=>{
      if(r.reviewerId === this.user.id){
        r.reviewer = this.user.username
        this.reviewDB.updateReview(r)
      }
    })
  }


  validar(field: string, error: string) {
    return this.formulario.controls[field].getError(error)
      &&
      this.formulario.controls[field].touched;
  }

  async validarUserName(){
    this.isValidUserName = false
    const users = await this.userAPI.getUsers()
    users.forEach((u:User) => {
      if(u.id != localStorage['token'] && u.username === this.formulario.controls['userName'].value){
        this.isValidUserName = true

      } 
      
    });
  }

}
