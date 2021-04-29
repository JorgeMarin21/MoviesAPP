import { Component } from '@angular/core';
import { DataLocalService } from './services/data-local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dataLocalService: DataLocalService) {  }

}
