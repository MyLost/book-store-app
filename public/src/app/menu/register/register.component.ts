import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import {RegisterService} from './register.service';
import {validateInputCustomValidator} from '../../common/BookValidator';
import {MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

import { CardModule } from 'primeng/card';
import { AuthenticationResponseModel } from '../../auth/login/authentication-response-model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [
        ReactiveFormsModule,
        ToastModule,
        MessageModule,
        CalendarModule,
        InputTextModule,
        CardModule
    ],
    providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  protected validFirstName: boolean;
  protected validLastName: boolean;
  protected validUsername: boolean;
  protected validPassword: boolean;
  protected validConfirmPassword: boolean;
  protected validBornOn: boolean;
  protected messageFirstName: string;
  protected messageLastName: string;
  protected messageUsername: string;
  protected messagePassword: string;
  protected messageConfirmPassword: string;
  protected messageBornOn: string;
  protected register: FormGroup;
  protected user = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    bornOn: ''
  };

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private messageService: MessageService,
    private router: Router
  ) {

    this.register = this.fb.group({
      firstName: [this.user.firstName,
      [Validators.required,
      validateInputCustomValidator(/[<>]/)
    ]],
      lastName: [this.user.lastName, [Validators.required, validateInputCustomValidator(/[<>]/)]],
      username: [this.user.username, [Validators.required, validateInputCustomValidator(/[<>]/)]],
      password: [this.user.password, [Validators.required, validateInputCustomValidator(/[<>]/)]],
      confirmPassword: [this.user.confirmPassword, [Validators.required, validateInputCustomValidator(/[<>]/)]],
      bornDate: [this.user.bornOn, [Validators.required, validateInputCustomValidator(/[<>]/)]],
    });
  }

  ngOnInit() {}

  validateFirstName() {
    if (this.register.controls.firstName.value === '') {
      this.messageFirstName = 'First name is required!!!';
      this.validFirstName = true;
    } else if (!this.register.controls.firstName.valid) {
      this.messageFirstName = 'Unallowable symbol!!!';
      this.validFirstName = true;
    } else {
      this.validFirstName = false;
    }

  }

  validateLastName() {
    if (this.register.controls.lastName.value === '') {
      this.messageLastName = 'Last name is required!!!';
      this.validLastName = true;
    } else if (!this.register.controls.lastName.valid) {
      this.messageLastName = 'Unallowable symbol!!!';
      this.validLastName = true;
    } else {
      this.validLastName = false;
    }
  }

  validateUsername() {
    if (this.register.controls.username.value === '') {
      this.messageUsername = 'Username is required!!!';
      this.validUsername = true;
    } else if (!this.register.controls.username.valid) {
      this.messageUsername = 'Unallowable symbol!!!';
      this.validUsername = true;
    } else {
      this.validUsername = false;
    }
  }

  validatePassword() {
    if (this.register.controls.password.value === '') {
      this.messagePassword = 'Password is required!!!';
      this.validPassword = true;
    } else if (!this.register.controls.password.valid) {
      this.messagePassword = 'Unallowable symbol!!!';
      this.validPassword = true;
    } else {
      this.validPassword = false;
    }
  }

  validateConfirmPassword() {
    if (this.register.controls.confirmPassword.value === '') {
      this.messageConfirmPassword = 'ConfirmPassword is required!!!';
      this.validConfirmPassword = true;
    } else if (!this.register.controls.confirmPassword.valid) {
      this.messageConfirmPassword = 'Unallowable symbol!!!';
      this.validConfirmPassword = true;
    } else {
      this.validConfirmPassword = false;
    }
  }

  validateBornOn() {
      if  (!this.register.controls.bornDate.valid) {
        this.messageBornOn = 'Invalid Data';
        this.validBornOn = true;
      } else {
        this.validBornOn = false;
      }
  }

  onSubmit() {
    const registerFormValue  = this.register.value;
    this.registerService.register(registerFormValue).subscribe( (result: AuthenticationResponseModel) => {
      if (result) {
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Your registration is success!'});
        localStorage.setItem('access_token', result.accessToken);
        localStorage.setItem('refresh_token', result.refreshToken);
        localStorage.setItem('expires_at', jwtDecode(result.accessToken).exp.toString());
        this.router.navigateByUrl('/home');
      } else {
      this.messageService.add({severity: 'error', summary: 'Service Message', detail: 'Your registration fail! Please contact with service provider for more information!' });
      }
    });
  }
}
