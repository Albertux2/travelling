import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCommentsComponent } from './UserComments.component';
import { IonicModule } from '@ionic/angular';
import { CommentModule } from '../Comment/Comment.module';

@NgModule({
  imports: [
    CommonModule,IonicModule,CommentModule
  ],
  declarations: [UserCommentsComponent],
})
export class UserCommentsModule { }
