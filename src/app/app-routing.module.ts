import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumReviewsComponent } from './pages/album/album-reviews/album-reviews.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  
  {path:'album/:id', component: AlbumReviewsComponent},
  
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
