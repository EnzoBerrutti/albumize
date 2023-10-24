import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AlbumComponent } from './pages/album/album.component';
import { HelloAndButtonComponent } from './components/hello-and-button/hello-and-button.component';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumTracksComponent } from './components/album-tracks/album-tracks.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AlbumComponent,
    HelloAndButtonComponent,
    SearchArtistComponent,
    AlbumTracksComponent,
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
