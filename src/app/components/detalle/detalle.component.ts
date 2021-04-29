import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Cast, PeliculaDetalle } from '../../interfaces/interfaces';
import { ModalController, ToastController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { Tab3Page } from '../../tab3/tab3.page';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id: string;
  pelicula: PeliculaDetalle ;
  actores: Cast[] = [];
  oculto = 150;
  respuesta;
  isFav = false;
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    public toastController: ToastController,
    private tab3Page: Tab3Page
    ) { }

  ngOnInit() {
    this.moviesService.getPeliculaDetalle(this.id).subscribe( (response) => {
      this.pelicula = response;
      this.isFav = this.dataLocal.searchMovie(this.pelicula);
    });
    this.moviesService.getActoresPelicula(this.id).subscribe( (response) => {
      this.actores = response.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss({
      isFav: this.isFav
    });
  }
  favorito() {
    this.respuesta = this.dataLocal.saveMovie(this.pelicula);
    this.presentToast(this.respuesta.mensaje);
    this.isFav = this.respuesta.fav;
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      position: 'top',
      message,
      duration: 2000
    });
    toast.present();
  }


}
