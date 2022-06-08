import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Comment } from 'src/app/model/Comment';
import { CommentService } from 'src/app/services/Comment.service';

@Component({
  selector: 'app-UserComments',
  templateUrl: './UserComments.component.html',
  styleUrls: ['./UserComments.component.css']
})
export class UserCommentsComponent implements OnInit {

  private _comments: Comment[];

  constructor(private navController:NavController,private commentService:CommentService) {
    this.getComments()
   }

  ngOnInit() {
  }

  public goBack() {
    this.navController.back();
  }

  private getComments(){
    this.commentService.commentList$.subscribe((comments)=>{
      this.comments = comments;
      this.comments.map((c)=>c.date = new Date(c.date))
      console.log(this.comments)
    })
    this.commentService.getCommentsFromUser();
  }

  public get comments(): Comment[] {
    return this._comments;
  }
  public set comments(value: Comment[]) {
    this._comments = value;
  }

}
