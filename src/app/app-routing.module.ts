import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumTracksComponent } from './components/album-tracks/album-tracks.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'**',redirectTo:'home'},
  {path:'album/:id', component: AlbumTracksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
