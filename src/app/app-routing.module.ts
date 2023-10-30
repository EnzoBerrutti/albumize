import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumReviewsComponent } from './pages/album/album-reviews/album-reviews.component';
import { AlbumInfoComponent } from './pages/album/album-info/album-info.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'search/:query', component:SearchResultPageComponent},
  {path:'album/:id', component: AlbumInfoComponent},
  
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
