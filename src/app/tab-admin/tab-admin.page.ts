import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { MyFormGroup } from '../model/myFormGroup';
import { Travel } from '../model/Travel';
import { TravelService } from '../services/TravelService.service';

@Component({
  selector: 'app-tab-admin',
  templateUrl: './tab-admin.page.html',
  styleUrls: ['./tab-admin.page.scss'],
})
export class TabAdminPage implements OnInit {
  private _travelData: FormGroup;
  
  constructor(private travelService:TravelService,private toastController:ToastController) {
    this.formInitiation();
   }

  ngOnInit() {
  }

  public addTravel(){
    if(!this.travelData.valid){
      let toastFunc = async ()=>{
        let toast = await this.toastController.create({
          message: "Rellene todos los campos obligatorios.",
          icon: 'information-circle',
          position: 'bottom',
          animated:true,
          duration:5000
        })
        await toast.present();
      }
      toastFunc();
    }
    let travel:Travel = this.travelData.value;
    this.travelService.postTravel(travel)
    this._travelData.reset()
  }

  private formInitiation() {
    this.travelData = new FormGroup({
      title: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      imgUrl: new FormControl(),
      valoration: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required,Validators.pattern(new RegExp("^[0-9]*$"))]),
      location: new FormControl('', Validators.required),
    });
  }
  public get travelData(): FormGroup {
    return this._travelData;
  }
  public set travelData(value: FormGroup) {
    this._travelData = value;
  }
}
