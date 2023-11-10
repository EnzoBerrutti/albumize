import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album, Review, Track, TracksResponse } from 'src/app/interfaces/interfaces';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ServicioMusicaService } from 'src/app/services/servicio-musica.service';

@Component({
  selector: 'app-album-intro',
  templateUrl: './album-intro.component.html',
  styleUrls: ['./album-intro.component.css']
})
export class AlbumIntroComponent implements OnInit{

  album: Album | undefined
  listaReviews: Review[] = []
  score:number | string = 0
  albumId: string | null = null
  tracks!:TracksResponse
  tracksWithNumbers: Track [] = []
  favourite3: string[] = []
  overrated3: string[] = []
  underrated3: string[] = []
  worst3: string[] = []

  constructor(private route:ActivatedRoute,private servicio:ServicioMusicaService,private reviewsService:ReviewsService){}

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.albumId = params.get('id');
  
      if (this.albumId) {
        this.album = await this.servicio.getAlbumByID(this.albumId);
        await this.leer();
        await this.loadAlbumTracks(this.albumId);
  
        if (this.listaReviews) {
          this.score = this.calcularScore(this.listaReviews, this.albumId);
          this.favourite3 = this.getFavourite3(this.listaReviews, this.tracksWithNumbers, this.albumId);
          this.overrated3 = this.getOverrated3(this.listaReviews, this.tracksWithNumbers, this.albumId);
          this.underrated3 = this.getUnderrated3(this.listaReviews, this.tracksWithNumbers, this.albumId);
          this.worst3 = this.getWorst3(this.listaReviews, this.tracksWithNumbers, this.albumId);
        }
      }
    });
  }

  async leer(){
    this.listaReviews = await this.reviewsService.getReviews()
  }

  calcularScore(reviews: Review[], albumUrl: string): number | string {
    const filteredReviews = reviews.filter(review => review.albumUrl === albumUrl);
  
    if (filteredReviews.length === 0) {
      return "ND";
    }
  
    const totalScore = filteredReviews.reduce((accumulator, review) => accumulator + review.punctuation, 0);
    const averageScore = totalScore / filteredReviews.length;
  
    return parseFloat(averageScore.toFixed(1));
  }

  async loadAlbumTracks(id: string) {
    try {
      const respuesta = await this.servicio.getAlbumSongs(id);
      this.tracks = respuesta;
      this.addNumbersToTracks(this.tracks.items);
  
      if (this.listaReviews && this.albumId) {
        this.favourite3 = this.getFavourite3(this.listaReviews, this.tracksWithNumbers, this.albumId);
      }
    } catch (error) {
      console.error(error);
    }
  }

  addNumbersToTracks(tracks: Track[]) {
    this.tracksWithNumbers = tracks.map((track, index) => ({
      ...track,
      trackNumber: index + 1
    }));
  }

  getFavourite3(reviews: Review[], tracks: Track[], albumId: string): string[] {
    const countMap: Record<number, number> = {};
  
    // Filtrar las revisiones para que solo incluyan las del álbum actual
    const filteredReviews = reviews.filter((review) => review.albumUrl === albumId);

    // Reducir para que solo divida por la cantidad de veces que alguien voto favorito
    const totalFavouriteVotes = filteredReviews.reduce((total, review) => {
      const favouriteNumber = review.favourite;
    
      if (favouriteNumber !== undefined && favouriteNumber !== null) {
        return total + 1;
      }
    
      return total;
    }, 0);
  
    // Contar la frecuencia de cada favorito en las revisiones filtradas
    filteredReviews.forEach((review) => {
      const favouriteNumber = review.favourite;
  
      if (favouriteNumber !== undefined) {
        countMap[favouriteNumber] = (countMap[favouriteNumber] || 0) + 1;
      }
    });
  
    // Ordenar por frecuencia de mayor a menor
    const sortedCountMap = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  
    // Obtener los tres primeros favoritos o menos si no hay suficientes
    const top3Indices = sortedCountMap.slice(0, 3).map((entry) => parseInt(entry[0], 10));
  
    // Obtener las canciones asociadas con los índices y calcular el porcentaje
    const top3Songs: string[] = top3Indices.map((index) => {
      const track = tracks.find((track) => track.trackNumber === index + 1);
  
      if (track) {
        const percentage = totalFavouriteVotes !== 0 ? (countMap[index] / totalFavouriteVotes) * 100 : 0;
        const truncatedTitle = this.truncateText(track.name);
        return `${truncatedTitle} ${percentage.toFixed(2)}%`;
      }
  
      return "No Data";
    });
  
    return top3Songs;
  }

  getOverrated3(reviews: Review[], tracks: Track[], albumId: string): string[] {
    const countMap: Record<number, number> = {};
  
    // Filtrar las revisiones para que solo incluyan las del álbum actual
    const filteredReviews = reviews.filter((review) => review.albumUrl === albumId);

    // Reducir para que solo divida por la cantidad de veces que alguien voto overrated
    const totalOverratedVotes = filteredReviews.reduce((total, review) => {
      const overratedNumber = review.overrated;
    
      if (overratedNumber !== undefined && overratedNumber !== null) {
        return total + 1;
      }
    
      return total;
    }, 0);
  
    // Contar la frecuencia de cada favorito en las revisiones filtradas
    filteredReviews.forEach((review) => {
      const overratedNumber = review.overrated;
  
      if (overratedNumber !== undefined) {
        countMap[overratedNumber] = (countMap[overratedNumber] || 0) + 1;
      }
    });
  
    // Ordenar por frecuencia de mayor a menor
    const sortedCountMap = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  
    // Obtener los tres primeros favoritos o menos si no hay suficientes
    const top3Indices = sortedCountMap.slice(0, 3).map((entry) => parseInt(entry[0], 10));
  
    // Obtener las canciones asociadas con los índices y calcular el porcentaje
    const totalReviews = filteredReviews.length;
    const top3Songs: string[] = top3Indices.map((index) => {
      const track = tracks.find((track) => track.trackNumber === index + 1);
  
      if (track) {
        const percentage = totalOverratedVotes !== 0 ? (countMap[index] / totalOverratedVotes) * 100 : 0;
        const truncatedTitle = this.truncateText(track.name);
        return `${truncatedTitle} ${percentage.toFixed(2)}%`;
      }
  
      return "No Data";
    });
  
    return top3Songs;
  }

  getUnderrated3(reviews: Review[], tracks: Track[], albumId: string): string[] {
    const countMap: Record<number, number> = {};
  
    // Filtrar las revisiones para que solo incluyan las del álbum actual
    const filteredReviews = reviews.filter((review) => review.albumUrl === albumId);

    // Reducir para que solo divida por la cantidad de veces que alguien voto underrated
    const totalUnderratedVotes = filteredReviews.reduce((total, review) => {
      const underratedNumber = review.underrated;
    
      if (underratedNumber !== undefined && underratedNumber !== null) {
        return total + 1;
      }
    
      return total;
    }, 0);
  
    // Contar la frecuencia de cada favorito en las revisiones filtradas
    filteredReviews.forEach((review) => {
      const underratedNumber = review.underrated;
  
      if (underratedNumber !== undefined) {
        countMap[underratedNumber] = (countMap[underratedNumber] || 0) + 1;
      }
    });
  
    // Ordenar por frecuencia de mayor a menor
    const sortedCountMap = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  
    // Obtener los tres primeros favoritos o menos si no hay suficientes
    const top3Indices = sortedCountMap.slice(0, 3).map((entry) => parseInt(entry[0], 10));
  
    // Obtener las canciones asociadas con los índices y calcular el porcentaje
    const totalReviews = filteredReviews.length;
    const top3Songs: string[] = top3Indices.map((index) => {
      const track = tracks.find((track) => track.trackNumber === index + 1);
  
      if (track) {
        const percentage = totalUnderratedVotes !== 0 ? (countMap[index] / totalUnderratedVotes) * 100 : 0;
        const truncatedTitle = this.truncateText(track.name);
        return `${truncatedTitle} ${percentage.toFixed(2)}%`;
      }
  
      return "No Data";
    });
  
    return top3Songs;
  }

  getWorst3(reviews: Review[], tracks: Track[], albumId: string): string[] {
    const countMap: Record<number, number> = {};
  
    // Filtrar las revisiones para que solo incluyan las del álbum actual
    const filteredReviews = reviews.filter((review) => review.albumUrl === albumId);

    // Reducir para que solo divida por la cantidad de veces que alguien voto favorito
    const totalWorstVotes = filteredReviews.reduce((total, review) => {
      const worstNumber = review.worst;
    
      if (worstNumber !== undefined && worstNumber !== null) {
        return total + 1;
      }
    
      return total;
    }, 0);
  
    // Contar la frecuencia de cada favorito en las revisiones filtradas
    filteredReviews.forEach((review) => {
      const worstNumber = review.worst;
  
      if (worstNumber !== undefined) {
        countMap[worstNumber] = (countMap[worstNumber] || 0) + 1;
      }
    });
  
    // Ordenar por frecuencia de mayor a menor
    const sortedCountMap = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  
    // Obtener los tres primeros favoritos o menos si no hay suficientes
    const top3Indices = sortedCountMap.slice(0, 3).map((entry) => parseInt(entry[0], 10));
  
    // Obtener las canciones asociadas con los índices y calcular el porcentaje
    const totalReviews = filteredReviews.length;
    const top3Songs: string[] = top3Indices.map((index) => {
      const track = tracks.find((track) => track.trackNumber === index + 1);
  
      if (track) {
        const percentage = totalWorstVotes !== 0 ? (countMap[index] / totalWorstVotes) * 100 : 0;
        const truncatedTitle = this.truncateText(track.name);
        return `${truncatedTitle} ${percentage.toFixed(2)}%`;
      }
  
      return "No Data";
    });
  
    return top3Songs;
  }

  truncateText(text: string): string {
    const maxLength = 10;
    if (text && text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text || 'No Data';
  }
}


