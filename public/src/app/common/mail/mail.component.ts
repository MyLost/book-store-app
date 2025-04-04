import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageModule } from 'primeng/message';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { Textarea } from "primeng/textarea";
import { FloatLabel } from "primeng/floatlabel";


@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
  imports: [
    MessageModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    ErrorMessageComponent,
    Textarea,
    FloatLabel
  ],
    styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  protected gender: SelectItem[] = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  protected validationMessages = {
    firstName: {
      required: 'First name is required',
      firstName: 'Please provide valid first name',
    },
    lastName: {
      required: 'Last name is required',
      lastName: 'Please provide valid last name',
    },
    message: {
      required: 'Email is required',
    },
    email: {
      required: 'Email is required',
      email: 'Please provide a valid email',
    }
  };

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  protected submit(contactForm: NgForm) {
    contactForm.form.markAllAsTouched();
    if (contactForm.valid) {
      console.log(contactForm.value);
      contactForm.resetForm();
      this.messageService.add({
        severity: 'success',
        summary: 'System Message',
        detail: 'Email was send successfully'
      });
    }
  }
}
