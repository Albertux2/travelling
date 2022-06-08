import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs/internal/Subject';
import { Booking } from '../model/Booking';
import { UserAuthenticationService } from './UserAuthentication.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private _bookingList$!: Subject<Booking[]>;

  private readonly baseUrl: string = 'http://localhost:8080/';
  constructor(
    private http: HttpClient,
    private userService: UserAuthenticationService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.bookingList$ = new Subject();
  }

  getBookings(query: string) {
    this.http
      .get<Response>(
        this.baseUrl +
          'booking/' +
          query +
          '?userId=' +
          this.userService.user.id,
        this.userService.getTokenHeader()
      )
      .subscribe((response) => {
        this._bookingList$.next(response.data.bookings)
      });
  }

  postBooking(booking: Booking) {
    let body = JSON.parse(JSON.stringify(booking));
    this.http
      .post(
        this.baseUrl + 'booking/booking',
        body,
        this.userService.getTokenHeader()
      )
      .subscribe(async (response) => {
        this.showAlert('¡Reserva efectuada!');
        this.router.navigateByUrl('/');
      });
  }

  private async showAlert(message: string) {
    let alert = await this.alertController.create({
      message: message,
      animated: true,
      cssClass: ['alertCustom'],
    });
    await alert.present();
  }

  public get bookingList$(): Subject<Booking[]> {
    return this._bookingList$;
  }
  public set bookingList$(value: Subject<Booking[]>) {
    this._bookingList$ = value;
  }
}

interface Response {
  data: { bookings: Booking[] };
}
