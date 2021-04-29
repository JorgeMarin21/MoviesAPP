import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  movies: PeliculaDetalle[] = [];
  constructor(private storage: Storage) {
    this.createStorage();
    this.loadFavorites();
  }
  async createStorage() {
    this.storage = await this.storage.create();
  }
  async loadFavorites() {
    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    return this.movies;
  }
  searchMovie(movie: PeliculaDetalle) {
    // let flag = false;
    // for (const index of this.movies) {
    //   if (movie.id === index.id) {
    //     flag = true;
    //     break;
    //   }
    // }

    // let flag = false;
    // this.movies.forEach(index => {
    //   if (movie.id === index.id) {
    //     flag = true;
    //   }
    // });

    const exist = this.movies.find(index => index.id === movie.id);
    const flag = exist ? true : false;
    return flag;
  }
  saveMovie(movie: PeliculaDetalle) {
    const body = {mensaje: '', fav: false};
    const flag = this.searchMovie(movie);
    if (flag) {
      this.movies = this.movies.filter(peli => peli.id !== movie.id);
      body.mensaje = 'Removida de favoritos';
      body.fav = false;
    } else {
      this.movies.push(movie);
      body.mensaje = 'Agregada a favoritos';
      body.fav = true;
    }
    this.storage.set('movies', this.movies);
    return body;
  }
}
