import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { User } from '../model/User';
import { UserDTO } from '../model/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  private readonly baseUrl = 'http://localhost:8080/';
  private readonly loginUrl = this.baseUrl + 'login';
  private readonly registerUrl = this.baseUrl + 'user/signup';
  private readonly refreshUrl = this.baseUrl + 'user/refresh';
  private _logged: boolean = false;
  private _user!: User;
  private _admin: boolean = false;

  private _refresher = (error: any, reexecuteFunction: Function) => {};
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  public getToken(): string {
    return 'Bearer ' + this.user.responseToken.access_token;
  }

  public getTokenHeader() {
    let options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.user.responseToken.access_token,
      }),
    };
    return options;
  }

  private checkIfAdmin(){
    this.http.get<boolean>(this.baseUrl+"user/admin?userId="+this.user.id).subscribe((admin)=>{
      this.admin = admin;
      this.router.navigateByUrl('/');
    })
  }

  public updateAvatar(imgUrl: string) {
    this.http
      .post<Response>(
        this.baseUrl +
          'user/avatar?avatar=' +
          imgUrl +
          '&username=' +
          this.user.username,
        this.getTokenHeader()
      )
      .subscribe(async (response) => {
        if (response.message.includes('ERROR:')) {
          let toast = await this.toastController.create({
            message: 'Error al actualizar',
            icon: 'information-circle',
            position: 'bottom',
            animated: true,
            duration: 5000,
          });
          await toast.present();
          return;
        }
        this.user.imgUrl = imgUrl;
      });
  }

  authenticate(username: string, password: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),
      params: new HttpParams()
        .set('username', username)
        .set('password', password),
      withCredentials: true,
    };
    this.http.post<ResponseToken>(this.loginUrl, null, options).subscribe(
      (respond) => {
        let responseToken: ResponseToken = respond;
        this.logged = true;
        this.user = {
          id:0,
          responseToken: responseToken,
          username: username,
          imgUrl: 'null',
        };
        this.getUserAvatar();
        this.getUserId();
      },
      async (err) => {
        let toast = await this.toastController.create({
          message: 'Credenciales no encontradas',
          icon: 'information-circle',
          position: 'bottom',
          animated: true,
          duration: 5000,
        });
        await toast.present();
      }
    );
  }
  
  getUserId() {
    this.http
      .get<Response>(
        this.baseUrl + 'user/id?username=' + this.user.username,
        this.getTokenHeader()
      )
      .subscribe(async (response) => {
        this.user.id = parseInt(response.message);
        this.checkIfAdmin();
      });
  }
  
  refresh(error: any, reexecuteFunction: Function) {
    let errorMessage: string = error.error[Object.keys(error.error)[0]];
    if (errorMessage.startsWith('The Token has expired on')) {
      console.log('Refresco token');
      let options = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.user.responseToken.refresh_token,
        }),
      };
      this.http
        .get<ResponseToken>(this.refreshUrl, options)
        .subscribe((respond) => {
          this.user.responseToken = respond;
          reexecuteFunction();
        });
    }
  }

  register(user: UserDTO) {
    this.http
      .post<Response>(this.registerUrl, user)
      .subscribe(async (response) => {
        if (response.message == 'Registrado con exito') {
          this.authenticate(user.username, user.password);
        } else {
          let toast = await this.toastController.create({
            message: response.message,
            icon: 'information-circle',
            position: 'bottom',
            animated: true,
            duration: 5000,
          });
          await toast.present();
        }
      });
  }

  getUserAvatar() {
    this.http
      .get<Response>(
        this.baseUrl + 'user/avatar?username=' + this.user.username,
        this.getTokenHeader()
      )
      .subscribe(async (response) => {
        this.user.imgUrl = response.message;
      });
  }

  public get admin(): boolean {
    return this._admin;
  }
  public set admin(value: boolean) {
    this._admin = value;
  }

  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }
  public get isLogged(): boolean {
    return this._logged;
  }
  public set logged(value: boolean) {
    this._logged = value;
  }
  public get refresher() {
    return this._refresher;
  }
  public set refresher(value) {
    this._refresher = value;
  }
}

export interface ResponseToken {
  access_token: string;
  refresh_token: string;
}

interface Response {
  message: string;
}
