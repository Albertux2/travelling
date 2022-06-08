import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../model/User';
import { UserAuthenticationService } from '../services/UserAuthentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  private _user: User;

  constructor(private userService:UserAuthenticationService,
    private alertController:AlertController,
    private router:Router) {
    this.user = userService.user
  }

  public async changeAvatar(){
    let alert = await this.alertController.create({
      animated:true,
      message:"Nueva dirección de imagen",
      inputs:[
        {
          placeholder:"Nueva dirección de imagen",
          name:"imgUrl",
        }
      ],
      buttons:[{text:"OK",
      handler:(data:any)=>{
        this.userService.updateAvatar(data.imgUrl)
      }},"CANCELAR"],
    })
    alert.present();
  }

  public goToBooking(){
    this.router.navigate(['booking'],{
      queryParams:{
        query: "booking"
      }
    })
  }

  public goToComments(){
    this.router.navigateByUrl('comments')
  }

  public goToHistory(){
    this.router.navigate(['booking'],{
      queryParams:{
        query: "history"
      }
    })
  }

  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }
}
