import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlbumReviewsComponent } from './pages/album/album-reviews/album-reviews.component';
import { AlbumInfoComponent } from './pages/album/album-info/album-info.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';
import { ProfileMainPageComponent } from './pages/profile-main-page/profile-main-page.component';
import { ProfileReviewsPageComponent } from './pages/profile-reviews-page/profile-reviews-page.component';
import { HomeLoggedinComponent } from './pages/home-loggedin/home-loggedin.component';
import { authGuard } from './guards/auth.guard';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AlbumModifyReviewComponent } from './pages/album/album-modify-review/album-modify-review.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
 /*  {path:'home/:id',component:HomeLoggedinComponent, canActivate : [authGuard]}, */
  {path:'register',component:RegisterPageComponent},
  {path:'search/:query', component:SearchResultPageComponent},
  {path:'album/:id', component: AlbumInfoComponent},
  {path: 'album/modify-review/:id', component: AlbumModifyReviewComponent},
  {path:'album-reviews/:id', component:AlbumReviewsComponent},
  {path:'account/:idUser/main', component: ProfileMainPageComponent, canActivate : [authGuard]},
  {path:'account/:idUser/reviews', component: ProfileReviewsPageComponent, canActivate : [authGuard]},
  {path:'about',component:AboutPageComponent},
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
