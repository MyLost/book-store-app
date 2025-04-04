import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, NgForm } from '@angular/forms';
import { ValidationPipe } from '../pipes/validation-pipe/validation.pipe';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-error-message',
    imports: [
        ValidationPipe,
        NgIf
    ],
    templateUrl: './error-message.component.html',
    host: { style: 'color: red;' }
})
export class ErrorMessageComponent {

  @Input() control!: FormControl | AbstractControl;
  @Input() errorMessages!: Object;

  constructor(public ngForm: NgForm) {
    console.log(ngForm);
  }

}
