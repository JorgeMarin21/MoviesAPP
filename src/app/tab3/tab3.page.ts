import { Component, OnInit } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  movies: PeliculaDetalle[] = [];
  genres: Genre[] = [];
  favoritesMovie: any[] = [];
  constructor(private dataLocalService: DataLocalService, private moviesService: MoviesService) {}
  async ionViewWillEnter() {
    this.movies = await this.dataLocalService.loadFavorites();
    this.genres = await this.moviesService.loadGenres();
    this.favoritesPerGenres(this.genres, this.movies);
    console.log('entra al willenter');
  }
  favoritesPerGenres(genres: Genre[], movies: PeliculaDetalle[]){
    // let moviesPerGenre;
    // let id;
    // genres.forEach( (genre, index) => {
    //   moviesPerGenre = [];
    //   id = genre.id;
    //   movies.forEach( movie => {
    //     movie.genres.forEach(movieGenre => {
    //       if (movieGenre.id === id) {
    //         moviesPerGenre.push(movie);
    //       }
    //     });
    //   });
    //   const body = { genre: genre.name, movies: moviesPerGenre};
    //   this.favoritesMovie.push(body);
    // });
    this.favoritesMovie = [];
    genres.forEach((genre) => {
      this.favoritesMovie.push({
        genre: genre.name,
        movies: movies.filter( peli => {
          return peli.genres.find( peliGenre => peliGenre.id === genre.id);
        })
      });
    });
    console.log('myBody', this.favoritesMovie);
  }
  async deleteFav() {
      this.movies = await this.dataLocalService.loadFavorites();
      this.genres = await this.moviesService.loadGenres();
      this.favoritesPerGenres(this.genres, this.movies);
      console.log('entra al deletefav');
  }
}
