import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAdminPageRoutingModule } from './tab-admin-routing.module';

import { TabAdminPage } from './tab-admin.page';
import { TabHeaderModule } from '../components/TabHeader/TabHeader.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAdminPageRoutingModule,
    TabHeaderModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [TabAdminPage]
})
export class TabAdminPageModule {}
