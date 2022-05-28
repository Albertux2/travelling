import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TravelCardComponent } from './TravelCard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [ CommonModule, FormsModule,FontAwesomeModule, IonicModule],
  declarations: [TravelCardComponent],
  exports: [TravelCardComponent]
})
export class TravelCardModule {}
