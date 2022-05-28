import { Component } from '@angular/core';
import { Travel } from '../model/Travel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public test: Test = { pulsado: false };
  public travels: Travel[] = [
    {
      content: 'Hotel rural en Badajoz',
      title: 'Hotel rural',
      type: 'Escapada rural',
      favorite: false,
      imgUrl: 'https://www.etapainfantil.com/wp-content/uploads/2016/07/Hotel-Cerdanya-EcoResort-Spa-Prullans-Lerida-700x496.jpg',
      valoration: 3,
      price:32,

    },
    {
      content: 'Este es el contenido del card',
      title: 'Hotel Caribe',
      type: 'Turismo sol y playa',
      favorite: false,
      imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/de/e7/a3/exterior-predator-lagoon.jpg',
      valoration: 5,
      price:58,

    },
    {
      content: 'Este es el contenido del card',
      title: 'Hotel Caribe',
      type: 'Turismo sol y playa',
      favorite: false,
      imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/de/e7/a3/exterior-predator-lagoon.jpg',
      valoration: 5,
      price:42,
    },
  ];
  constructor() {}

  public click() {
    console.log('clickeado bitch');
  }
}

export interface Test {
  pulsado: boolean;
}
