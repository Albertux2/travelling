import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  IonRouterOutlet,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Travel } from 'src/app/model/Travel';
import { Comment } from 'src/app/model/Comment';
import { UserAuthenticationService } from 'src/app/services/UserAuthentication.service';
import { User } from 'src/app/model/User';
import { CommentService } from 'src/app/services/Comment.service';
import { Booking } from 'src/app/model/Booking';
import { BookingService } from 'src/app/services/Booking.service';

@Component({
  selector: 'app-Travel',
  templateUrl: './Travel.component.html',
  styleUrls: ['./Travel.component.css'],
})
export class TravelComponent implements OnInit {
  private _travel!: Travel;
  private _startDate: Date;
  private _endDate: Date;
  private _commentData: FormGroup;
  private _bookingData: FormGroup;
  private _comments: Comment[] = [];
  private _currentUser: User;

  constructor(
    private router: ActivatedRoute,
    private navController: NavController,
    private toastController: ToastController,
    private userService: UserAuthenticationService,
    private commentService: CommentService,
    private bookingService:BookingService
  ) {
    this.travel = JSON.parse(this.router.snapshot.queryParams['travel']);
    this.formInitiation();
    this.total = this.travel.price;
    this.currentUser = this.userService.user;
    this.getComments();
    this.commentService.getCommentsFromTravel(this.travel.id);
  }

  getFormatedTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  public async postComment() {
    if (!this.commentData.valid) {
      this.toastError('Rellene todos los campos obligatorios');
      return;
    }
    let comment: Comment = this.commentData.value;
    comment.user = this.currentUser;
    comment.date = new Date();
    this.commentData.reset();
    this.commentService.postComment(comment, this.travel.id);
  }

  private async toastError(message: string) {
    const alert = await this.toastController.create({
      header: 'Error formulario',
      message: message,
      icon: 'information-circle',
      position: 'bottom',
      animated: true,
      duration: 5000,
    });
    await alert.present();
  }

  private formInitiation() {
    this.commentData = new FormGroup({
      message: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    });
    this.bookingData = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      persons: new FormControl('', Validators.required),
      doubleBed: new FormControl(),
    });
  }

  public async createBooking() {
    if (!this._bookingData.valid) {
      this.toastError('Rellene todos los campos obligatorios');
      return;
    }
    let booking:Booking = this.bookingData.value;
    booking.user = this.userService.user;
    booking.travel = this.travel;
    if(booking.doubleBed){
      this.total+=10;
    }
    booking.price = this.total;
    this.bookingService.postBooking(booking)
  }

  public getComments() {
    this.commentService.commentList$.subscribe((res) => {
      this._comments = res;
      this.comments.map((c) => {
        c.date = new Date(c.date);
      });
    });
  }

  ngOnInit() {}

  public setStartDate(value: string) {
    this.endDate = undefined;
    this.total = this.travel.price;
    let newDate: string = value.split('T')[0];
    this._startDate = new Date(newDate);
  }

  public setEndDate(value: string) {
    let newDate: string = value.split('T')[0];
    this.endDate = new Date(newDate);
    this.calculateDays();
    this.total = this.travel.price * (this.calculateDays() + 1);
  }

  private calculateDays() {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor(
      (this.endDate.getTime() - this.startDate.getTime()) / millisecondsPerDay
    );
  }

  public goBack() {
    this.navController.back();
  }

  public get currentUser(): User {
    return this._currentUser;
  }
  public set currentUser(value: User) {
    this._currentUser = value;
  }
  public get travel(): Travel {
    return this._travel;
  }
  public set travel(value: Travel) {
    this._travel = value;
  }
  public get startDate(): Date {
    return this._startDate;
  }
  public set startDate(value: Date) {
    this._startDate = value;
  }
  public get endDate(): Date {
    return this._endDate;
  }
  public set endDate(value: Date) {
    this._endDate = value;
  }
  public get commentData(): FormGroup {
    return this._commentData;
  }
  public set commentData(value: FormGroup) {
    this._commentData = value;
  }
  public get comments(): Comment[] {
    return this._comments;
  }
  public set comments(value: Comment[]) {
    this._comments = value;
  }

  private _total: number;
  public get total(): number {
    return this._total;
  }
  public set total(value: number) {
    this._total = value;
  }
  public get bookingData(): FormGroup {
    return this._bookingData;
  }
  public set bookingData(value: FormGroup) {
    this._bookingData = value;
  }
}
