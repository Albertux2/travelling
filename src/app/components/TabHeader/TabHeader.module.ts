import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TabHeaderComponent } from './TabHeader.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [TabHeaderComponent],
  exports: [TabHeaderComponent]
})
export class TabHeaderModule {}
