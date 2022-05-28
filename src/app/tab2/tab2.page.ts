import { Component, ɵɵelementContainerEnd } from '@angular/core';
import { Travel } from '../model/Travel';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public favorites:Travel[];


  constructor(private cardService:CardService) {
    this.favorites = cardService.favorites;
  }

}
