import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent {
  @Input() peliculas: Pelicula[] = [];
  @Output() isFavorite: EventEmitter<any> = new EventEmitter<any>();
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };
  constructor(private modalCtrl: ModalController) { }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id },
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    if (!data.isFav) {
      this.isFavorite.emit();
    }

  }
}
