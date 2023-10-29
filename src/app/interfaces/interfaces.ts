export interface Review{
    review:string,
    albumUrl:string,
    punctuation:number,
    reviewer:string, /*debe ser un username*/
    date:Date;
}

export interface User{
    username:string,
    email:string,
    password:string,
    reviewList:Review[];
}

export interface Images {
    height: string,
    url: string,
    width: string
  }
  
 export interface Artist {
    external_urls: string,
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
  }
  
 export interface Album {
    album_type: string,
    artists: Artist[],
    availableMarkets: string,
    externalsURL: string,
    href: string,
    id: string,
    images: Images[],
    name: string,
    release_date: string,
    realeaseDatePrecision: string,
    totalTracks: string;
    type: string,
    uri: string,
  }

  export interface Track{
    artists: Artist[];
    duration_ms: number;
    name: string;
    trackNumber: number;
  }

  export interface TracksResponse{
    items:Track[];
  }