import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './Comment.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,IonicModule
  ],
  exports:[CommentComponent],
  declarations: [CommentComponent]
})
export class CommentModule { }
