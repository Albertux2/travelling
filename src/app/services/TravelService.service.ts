import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs/internal/Subject';
import { Travel } from '../model/Travel';
import { UserAuthenticationService } from './UserAuthentication.service';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private _travelList$!: Subject<Travel[]>;
  
  private readonly baseUrl: string = 'http://localhost:8080/';
  constructor(
    private http: HttpClient,
    private userService: UserAuthenticationService,
    private alertController:AlertController
  ) {
    this.travelList$ = new Subject();
  }

  postTravel(travel:Travel){
    let body = JSON.parse(JSON.stringify(travel));
    this.http
      .post(
        this.baseUrl + 'travel/add',
        body,
        this.userService.getTokenHeader()
      )
      .subscribe((e) => {
        this.getTravels();
        this.showAlert("Añadido con exito")
      });
  }
  

  getTravels() {
    this.http
      .get<Response>(
        this.baseUrl + 'travel/?userId=' + this.userService.user.id,
        this.userService.getTokenHeader()
      )
      .subscribe(async (response) => {
        this.travelList$.next(response.data.travels)
      });
  }
  public get travelList$(): Subject<Travel[]> {
    return this._travelList$;
  }
  public set travelList$(value: Subject<Travel[]>) {
    this._travelList$ = value;
  }
  private async showAlert(message: string) {
    let alert = await this.alertController.create({
      message: message,
      animated: true,
      cssClass: ['alertCustom'],
    });
    await alert.present();
  }
}

interface Response {
  data: { travels: Travel[] };
}
