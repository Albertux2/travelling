import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Login.component';
import { IonicModule } from '@ionic/angular';
import { TabHeaderModule } from '../TabHeader/TabHeader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule,IonicModule,TabHeaderModule,FormsModule,ReactiveFormsModule],
  declarations: [LoginComponent]
})
export class LoginModule { }
