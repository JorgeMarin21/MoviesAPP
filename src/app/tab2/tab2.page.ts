import { Component } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  ideas: string[] = ['spiderman', 'la vida es bella', 'vengadores'];
  peliculas: Pelicula[] = [];
  loading = false;
  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) { }

  onSearchChange(event) {
    const value = event.target.value;
    console.log(value);
    if (value) {
      this.loading = true;
      this.moviesService.getBusqueda(value).subscribe((data) => {
        this.loading = false;
        console.log(data);
        this.peliculas = data.results;
      });
    } else {
      this.peliculas = [];
    }

  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id },
    });
    modal.present();
  }
}

