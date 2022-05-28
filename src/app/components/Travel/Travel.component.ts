import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  IonRouterOutlet,
  NavController,
} from '@ionic/angular';
import { Travel } from 'src/app/model/Travel';
import { Comment } from 'src/app/model/Comment';

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
  private _comments: Comment[] = [
    {
      date: new Date(),
      user: {
        username: 'Albertux2',
        imgUrl:
          'https://ih1.redbubble.net/image.531944933.8717/flat,750x1000,075,f.u4.jpg',
      },
      message: 'Hotel acogedor con buenas vistas',
      rating: 3,
    },
  ];

  constructor(
    private router: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController
  ) {
    this.travel = JSON.parse(this.router.snapshot.queryParams['travel']);
    this.commentData = new FormGroup({
      message: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    });
    this.bookingData = new FormGroup({
      startDate: new FormControl('',Validators.required),
      endDate: new FormControl('',Validators.required),
      persons: new FormControl('',Validators.required),
      double: new FormControl()
    })
    this.total = this.travel.price;
  }

  getFormatedTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  public async postComment() {
    if (!this.commentData.valid) {
      this.alertError("Rellene todos los campos obligatorios")
      return;
    }
    let comment: Comment = this.commentData.value;
    comment.user = {
      username: 'Albertux2',
      imgUrl:
        'https://ih1.redbubble.net/image.531944933.8717/flat,750x1000,075,f.u4.jpg',
    };
    comment.date = new Date();
    this.comments.push(comment);
    this.commentData.reset();
  }

  private async alertError(message:string){
    const alert = await this.alertController.create({
      header: 'Error formulario',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  public async createBooking(){
    if (!this._bookingData.valid) {
      this.alertError("Rellene todos los campos obligatorios")
      return;
    }
    console.log(this.bookingData.value)
  }

  ngOnInit() {}

  public setStartDate(value: string) {
    this.endDate = undefined;
    let newDate: string = value.split('T')[0];
    this._startDate = new Date(newDate);
  }

  public setEndDate(value: string) {
    let newDate: string = value.split('T')[0];
    this.endDate = new Date(newDate);
  }

  public goBack() {
    this.navController.back();
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
