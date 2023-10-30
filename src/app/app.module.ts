import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumTracksComponent } from './components/album-tracks/album-tracks.component';
import { ReviewButtonsComponent } from './components/review-buttons/review-buttons.component';
import { ReviewInAlbumPageComponent } from './components/review-in-album-page/review-in-album-page.component';

import { AlbumReviewsComponent } from './pages/album/album-reviews/album-reviews.component';
import { AlbumInfoComponent } from './pages/album/album-info/album-info.component';
import { AlbumIntroComponent } from './components/album-intro/album-intro.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumInfoComponent,
    AlbumTracksComponent,
    ReviewButtonsComponent,
    ReviewInAlbumPageComponent,
    NavbarComponent,
    HomeComponent,
    SearchArtistComponent,
    AlbumReviewsComponent,
    AlbumIntroComponent,
    RegisterFormComponent,
    RegisterPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
