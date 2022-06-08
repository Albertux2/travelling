import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Comment } from '../model/Comment';
import { UserAuthenticationService } from './UserAuthentication.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _commentList$!: Subject<Comment[]>;

  private readonly baseUrl: string = 'http://localhost:8080/';
  constructor(
    private http: HttpClient,
    private userService: UserAuthenticationService
  ) {
    this.commentList$ = new Subject();
  }

  getCommentsFromUser() {
    this.http
      .get<Response>(
        this.baseUrl + 'comments/user?userId=' + this.userService.user.id,
        this.userService.getTokenHeader()
      )
      .subscribe(async (response) => {
        this.commentList$.next(response.data.comments);
      });
  }
  getCommentsFromTravel(travelId: number) {
    this.http
      .get<Response>(
        this.baseUrl + 'comments/travel?travelId=' + travelId,
        this.userService.getTokenHeader()
      )
      .subscribe(
        async (response) => {
          this.commentList$.next(response.data.comments);
        },
        (err) => {
          this.userService.refresh(err, () => {
            console.log('refreshing');
            this.getCommentsFromTravel(travelId);
          });
        }
      );
  }
  public get commentList$(): Subject<Comment[]> {
    return this._commentList$;
  }
  public set commentList$(value: Subject<Comment[]>) {
    this._commentList$ = value;
  }

  postComment(comment: Comment, travelId: number) {
    let body = JSON.parse(JSON.stringify(comment));
    console.log(comment);
    this.http
      .post(
        this.baseUrl + 'comments/post?travelId=' + travelId,
        body,
        this.userService.getTokenHeader()
      )
      .subscribe((e) => {
        this.getCommentsFromTravel(travelId);
      });
  }
}

interface Response {
  data: { comments: Comment[] };
}
