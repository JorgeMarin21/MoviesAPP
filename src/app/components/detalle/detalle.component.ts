import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id: string;
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getPeliculaDetalle(this.id).subscribe( (response) => {
      console.log('pilla -> ', response);
    });
    this.moviesService.getActoresPelicula(this.id).subscribe( (response) => {
      console.log('pilla -> ', response);
    });
  }

}
