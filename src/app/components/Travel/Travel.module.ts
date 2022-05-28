import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TravelComponent } from './Travel.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TravelComponent],
  imports: [ CommonModule,BrowserModule, FormsModule, IonicModule,NgbModule,ReactiveFormsModule],
  exports: [TravelComponent]
})
export class TravelModule {}
