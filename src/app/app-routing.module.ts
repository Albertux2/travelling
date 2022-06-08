import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Login/Login.component';
import { TravelComponent } from './components/Travel/Travel.component';
import { UserCommentsComponent } from './components/UserComments/UserComments.component';
import { UserTravelsComponent } from './components/UserTravels/UserTravels.component';
import { LogGuard } from './guards/log.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[LogGuard]
  },
  {path:'travel',component:TravelComponent,canActivate:[LogGuard]},
  {path:'user',component:LoginComponent},
  {path:'booking',component:UserTravelsComponent,canActivate:[LogGuard]},
  {path:'comments',component:UserCommentsComponent,canActivate:[LogGuard]},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
