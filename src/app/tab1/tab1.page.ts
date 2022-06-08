import { Component } from '@angular/core';
import { Travel } from '../model/Travel';
import { TravelService } from '../services/TravelService.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public travels: Travel[]
  constructor(private travelService:TravelService) {
    this.getTravelsFromService()
    this.travelService.getTravels();
  }

  private getTravelsFromService(){
    this.travelService.travelList$.subscribe((travel)=>{
      this.travels = travel;
    })
  }
}
