import { Injectable } from '@angular/core';
import { Travel } from '../model/Travel';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _favorites: Travel[] = [];
  constructor() {
  }

  public toggleFavorite(favorite:Travel){
    if(favorite.favorite){
      this.favorites.push(favorite);
    }else{
      this.favorites.splice(this.favorites.indexOf(favorite),1)
    }
  }

  public get favorites(): Travel[] {
    return this._favorites;
  }
  public set favorites(value: Travel[]) {
    this._favorites = value;
  }
}
