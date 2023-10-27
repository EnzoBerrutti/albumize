import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumComponent } from './pages/album/album.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  
  {path:'album/:id', component: AlbumComponent},
  
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
