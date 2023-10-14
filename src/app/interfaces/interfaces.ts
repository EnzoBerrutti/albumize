export interface Review{
    review:string,
    albumUrl:string,
    punctuation:number,
    reviewer:string; /*debe ser un username*/
}

export interface user{
    username:string,
    email:string,
    password:string,
    reviewList:Review[];
}

export interface albumInDb{
    albumUrl:string,
    score:number,
    reviews:Review[];
    /*LOS DATOS DEL ALBUM QUE GUARDAMOS EN NUESTRO JASON/BASE DE DATOS */
}

export interface albumFromAPI{
    /*IMAGEN, DATOS, LISTA DE CANCIONES, CUALQUIER COSA QUE NOS SIRVA DE LA API*/
}