import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { ServicioUsersService } from 'src/app/services/servicio-users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  hayFoto: boolean = true
  ishidden:boolean = true
  idUser = {} as number;
  user = {} as User;

  constructor(
    private activatedRoute:ActivatedRoute,
    private userAPI: ServicioUsersService){
  }
  
 async ngOnInit() {
    this.activatedRoute.params.subscribe((params:Params) =>{
      this.idUser = +params['idUser']})
      this.user = await this.userAPI.getUserID(this.idUser);
  }

  onFileSelected(event:Event){
    if(event){
      console.log(event)
    }
  }
  showEditPhoto(){
    this.ishidden = false
  }

  hideEditPhoto(){
    this.ishidden = true
  }
}
