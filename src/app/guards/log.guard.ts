import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from '../services/UserAuthentication.service';

@Injectable({
  providedIn: 'root',
})
export class LogGuard implements CanActivate {
  constructor(
    private userService: UserAuthenticationService,
    private router: Router,
    private toastController:ToastController
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userService.isLogged) {
      let toastFunc = async ()=>{
        let toast = await this.toastController.create({
          message: "Inicie sesión para ver este contenido",
          icon: 'information-circle',
          position: 'bottom',
          animated:true,
          duration:5000
        })
        await toast.present();
      }
      toastFunc();
      this.router.navigateByUrl('/user');
      return false;
    }
    return true;
  }
}
