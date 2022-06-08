import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/Comment';

@Component({
  selector: 'app-Comment',
  templateUrl: './Comment.component.html',
  styleUrls: ['./Comment.component.css']
})
export class CommentComponent implements OnInit {


  @Input() comment:Comment
  constructor() { }

  ngOnInit() {
  }

}
