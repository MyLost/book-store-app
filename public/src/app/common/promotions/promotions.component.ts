import { Component, inject, Input, model, OnInit, signal } from '@angular/core';
import { Button } from "primeng/button";
import { Calendar } from "primeng/calendar";
import { Dialog } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FloatLabel } from "primeng/floatlabel";
import { InputGroup } from "primeng/inputgroup";
import { InputGroupAddon } from "primeng/inputgroupaddon";
import { InputText } from "primeng/inputtext";
import { KeyFilter } from "primeng/keyfilter";
import { Textarea } from "primeng/textarea";
import { PromotionsService } from "./promotions.service";
import { HttpConfig } from "../http-config";
import { Environment } from "@angular/cli/lib/config/workspace-schema";
import { environment } from "../../../environments/environment";
import { MessageService, SelectItem } from "primeng/api";
import { Select } from "primeng/select";
import { FormsModule, NgForm } from "@angular/forms";
import { toLocalDate } from "../Utils";
import { DatePicker } from "primeng/datepicker";

@Component({
  selector: 'app-promotions',
  imports: [
    Button,
    Calendar,
    Dialog,
    DropdownModule,
    FloatLabel,
    InputGroup,
    InputGroupAddon,
    InputText,
    KeyFilter,
    Textarea,
    Select,
    FormsModule,
    DatePicker
  ],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent implements OnInit {

  protected showPromotion = model<boolean>(false);
  protected promotionTypes = signal<SelectItem[]>([
    {label: 'BOOK', value: 'BOOK'}
  ]);

  private svc = inject(PromotionsService);
  private msgSvc = inject(MessageService);

  @Input() itemId!: number;


  ngOnInit(): void {

  }

  protected getPromotions() {
  }

  doSubmit(form: NgForm) {
    let value = form.value;
    value.startDate = toLocalDate(value.startDate);
    value.endDate = toLocalDate(value.endDate);
    value['itemId'] = this.itemId;
    form.form.markAllAsTouched();
    if (form.valid) {
      this.svc.save(value, {url: environment.backendFullHost + 'promotions'})
        .subscribe(data => {
          if(data.result) {
            this.msgSvc.add({
              key: 'app',
              detail: data.message,
              severity: "success",
              summary: "Success"
            })
          }
        });
    }
  }
}
