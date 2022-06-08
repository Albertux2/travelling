import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Booking } from 'src/app/model/Booking';
import { BookingService } from 'src/app/services/Booking.service';

@Component({
  selector: 'app-UserTravels',
  templateUrl: './UserTravels.component.html',
  styleUrls: ['./UserTravels.component.css']
})
export class UserTravelsComponent implements OnInit {

  private _bookings: Booking[] = [];


  constructor(private navController:NavController,
    private router:ActivatedRoute,
    private bookingService:BookingService) { 
      let query:string = this.router.snapshot.queryParams['query'];
      this.getBookings(query);
    }

  ngOnInit() {
  }

  
  public goBack() {
    this.navController.back();
  }

  private getBookings(query:string){
    this.bookingService.bookingList$.subscribe((bookings)=>{
      this.bookings = bookings;
      this.bookings.map((b)=>{
        b.endDate = new Date(b.endDate);
        b.startDate = new Date(b.startDate);
      })
    })
    this.bookingService.getBookings(query);
  }
  public get bookings(): Booking[] {
    return this._bookings;
  }
  public set bookings(value: Booking[]) {
    this._bookings = value;
  }

}
