import { Component, OnInit } from '@angular/core';
import { MyFormGroup } from 'src/app/model/myFormGroup';
import { UserDTO } from 'src/app/model/UserDTO';
import { LoginReactiveService } from 'src/app/services/LoginReactive.service';
import { RegisterReactiveService } from 'src/app/services/RegisterReactive.service';
import { UserAuthenticationService } from 'src/app/services/UserAuthentication.service';

@Component({
  selector: 'app-qkwdnqwljd',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  card:boolean = false

  private _loginControlForm!: MyFormGroup;
  private _loginNombreControles!: string[];
  private _registerControlForm!: MyFormGroup;
  private _registerNombreControles!: string[];

  private _userDTO: UserDTO = {
    username: '',
    password: '',
    passwordConfirm: '',
    imgUrl:''
  };
  constructor(
    private _loginForm: LoginReactiveService,
    private authService: UserAuthenticationService,
    private _registerForm: RegisterReactiveService,
  ) {
    this.loginNombreControles = this.loginForm.nombreControles;
    this.loginControlForm = this.loginForm.myFormGroup;
    this.registerControlForm = this.registerForm.myFormGroup;
    this.registerNombreControles = this.registerForm.nombreControles;
  }

  ngOnInit() {}

  changeCard(log:boolean){
    this.card = log;
  }
  
  login() {
    let username =
      this.loginControlForm.formGroup.value[this.loginNombreControles[0]];
    let password =
      this.loginControlForm.formGroup.value[this.loginNombreControles[1]];
    this.authService.authenticate(username, password);
  }

  signup() {
    this.userDTO = this.registerControlForm.formGroup.value;
    console.log(this.userDTO)
    this.authService.register(this.userDTO);
  }

  public get userDTO(): UserDTO {
    return this._userDTO;
  }
  public set userDTO(value: UserDTO) {
    this._userDTO = value;
  }
  public get loginControlForm(): MyFormGroup {
    return this._loginControlForm;
  }
  public set loginControlForm(value: MyFormGroup) {
    this._loginControlForm = value;
  }
  public get loginNombreControles(): string[] {
    return this._loginNombreControles;
  }
  public set loginNombreControles(value: string[]) {
    this._loginNombreControles = value;
  }
  public get loginForm(): LoginReactiveService {
    return this._loginForm;
  }
  public set loginForm(value: LoginReactiveService) {
    this._loginForm = value;
  }
  public get registerControlForm(): MyFormGroup {
    return this._registerControlForm;
  }
  public set registerControlForm(value: MyFormGroup) {
    this._registerControlForm = value;
  }
  public get registerNombreControles(): string[] {
    return this._registerNombreControles;
  }
  public set registerNombreControles(value: string[]) {
    this._registerNombreControles = value;
  }
  public get registerForm(): RegisterReactiveService {
    return this._registerForm;
  }
  public set registerForm(value: RegisterReactiveService) {
    this._registerForm = value;
  }
}
