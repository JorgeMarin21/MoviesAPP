import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
const URL = environment.url;
const APIKEY = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  genres: Genre[] = [];

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${APIKEY}&language=es&include_image_language=es`;
    // console.log('KLK', query);
    return this.http.get<T>(query);
  }
  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;
    if (mes < 10) {
      mesString = '0' + mes;
    }
    else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin  = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  getBusqueda(pelicula: string) {
    const query = `/search/movie?query=${pelicula}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }
  loadGenres(): Promise<Genre[]> {
    return new Promise( resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe( (resp) => {
        this.genres = resp['genres'];
        resolve(this.genres);
      });
    });
  }
}
