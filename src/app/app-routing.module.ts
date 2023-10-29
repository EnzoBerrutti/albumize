import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumReviewsComponent } from './pages/album/album-reviews/album-reviews.component';
import { AlbumInfoComponent } from './pages/album/album-info/album-info.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  
  {path:'album/:id', component: AlbumInfoComponent},
  
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
