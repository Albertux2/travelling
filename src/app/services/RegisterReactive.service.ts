import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { MyFormControl } from '../model/myformcontrol';
import { MyFormGroup } from '../model/myFormGroup';

@Injectable({
  providedIn: 'root',
})
export class RegisterReactiveService {
  private _myFormGroup!: MyFormGroup;

  private nombreCampos = ['Usuario','Dirección de la imagen (Opcional)', 'Contraseña', 'Confirmar contraseña'];
  public nombreControles = ['username','imgUrl', 'password', 'passwordConfirm'];
  private inputType = ['text','text','password','password']
  private controles = [
    new MyFormControl('', [Validators.required]),
    new MyFormControl('', []),
    new MyFormControl('', [Validators.required, Validators.minLength(6)]),
    new MyFormControl('', [Validators.required, Validators.minLength(6)]),
  ];
  constructor() {
    this._myFormGroup = new MyFormGroup(
      this.nombreCampos,
      this.nombreControles,
      this.controles,
      this.inputType
    );
    this._myFormGroup.insertarValidationMessages(
      'username',
      ['required'],
      ['El usuario es requerido']
    );
    this._myFormGroup.insertarValidationMessages(
      'password',
      ['required','minlength'],
      ['La contraseña es requerida','Minimo 6 caracteres']
    );
    this._myFormGroup.insertarValidationMessages(
      'passwordConfirm',
      ['required','minlength'],
      ['La confirmación es requerida','Minimo 6 caracteres']
    );
    this._myFormGroup.insertarValidationMessages(
      'imgUrl',
      ['required'],
      ['La confirmación es requerida']
    );
  }
  validateControl(element: string): boolean {
    let resultado =
      this._myFormGroup.getControl(element).dirty &&
      !this._myFormGroup.getControl(element).valid;
    return resultado;
  }

  public getErrorMessage(control: string) {
    let algo = this._myFormGroup.getControl(control);
    return algo.getValidationMessages();
  }
  public get myFormGroup(): MyFormGroup {
    return this._myFormGroup;
  }
  public set myFormGroup(value: MyFormGroup) {
    this._myFormGroup = value;
  }
}
