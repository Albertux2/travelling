import { Component } from '@angular/core';
import { UserAuthenticationService } from '../services/UserAuthentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {


  constructor(private _userService: UserAuthenticationService) {}

  public get userService(): UserAuthenticationService {
    return this._userService;
  }
  public set userService(value: UserAuthenticationService) {
    this._userService = value;
  }
}
