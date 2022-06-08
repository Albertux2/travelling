import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Travel } from '../model/Travel';
import { TravelService } from './TravelService.service';
import { UserAuthenticationService } from './UserAuthentication.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _favorites: Travel[] = [];
  private _favoriteList$: Subject<Travel[]>;
  private baseUrl = 'http://localhost:8080/travel/favorite';
  constructor(
    private http: HttpClient,
    private userService: UserAuthenticationService,
    private travelService:TravelService
  ) {
    this.favoriteList$ = new Subject();
  }

  toggleFavorite(travelId: number) {
    this.http.post(
      this.baseUrl +
        '?userId=' +
        this.userService.user.id +
        '&travelId=' +
        travelId,
      null,
      this.userService.getTokenHeader()
    ).subscribe((resp)=>{
      this.getFavorites();
      this.travelService.getTravels();
    });
  }

  public getFavorites() {
    this.http
      .get<Response>(
        this.baseUrl + '?userId=' + this.userService.user.id,
        this.userService.getTokenHeader()
      )
      .subscribe((response) => {
        this.favoriteList$.next(response.data.travels);
      });
  }

  public get favoriteList$(): Subject<Travel[]> {
    return this._favoriteList$;
  }
  public set favoriteList$(value: Subject<Travel[]>) {
    this._favoriteList$ = value;
  }
}

interface Response {
  data: { travels: Travel[] };
}
