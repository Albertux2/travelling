import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Travel } from 'src/app/model/Travel';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-TravelCard',
  templateUrl: './TravelCard.component.html',
  styleUrls: ['./TravelCard.component.css']
})
export class TravelCardComponent implements OnInit {

  constructor(private cardService:CardService,private router:Router) { }

  @Input() card:Travel

  ngOnInit() {
  }

  public onClick(){
    this.router.navigate(['travel'],{
      queryParams:{
        travel: JSON.stringify(this.card)
      }
    })
  }

  public addToFavorite(event){
    event.stopPropagation()
    this.card.favorite = !this.card.favorite;
    this.cardService.toggleFavorite(this.card);
    
  }

}
