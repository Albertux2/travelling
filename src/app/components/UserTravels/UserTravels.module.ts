import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTravelsComponent } from './UserTravels.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,IonicModule
  ],
  declarations: [UserTravelsComponent],
  exports:[UserTravelsComponent]
})
export class UserTravelsModule { }
