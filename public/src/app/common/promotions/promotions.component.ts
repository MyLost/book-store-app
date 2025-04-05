import { Component, inject, Input, model, OnInit, signal } from '@angular/core';
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FloatLabel } from "primeng/floatlabel";
import { InputGroup } from "primeng/inputgroup";
import { InputGroupAddon } from "primeng/inputgroupaddon";
import { InputText } from "primeng/inputtext";
import { KeyFilter } from "primeng/keyfilter";
import { Textarea } from "primeng/textarea";
import { PromotionsService } from "./promotions.service";
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
  protected categories = signal<any[]>(null);

  private _svc = inject(PromotionsService);
  private _msgSvc = inject(MessageService);

  @Input() itemId!: number;

  ngOnInit(): void {
  }

  protected getPromotions() {
  }

  protected doSubmit(form: NgForm) {
    let value = form.value;
    value.startDate = toLocalDate(value.startDate);
    value.endDate = toLocalDate(value.endDate);
    value['itemId'] = this.itemId;
    form.form.markAllAsTouched();
    if (form.valid) {
      this._svc.save(value, {url: environment.backendFullHost + 'promotions'})
        .subscribe(data => {
          if (data.result) {
            this._msgSvc.add({
              detail: data.message,
              severity: "success",
              summary: "Promotion saved successfully!"
            })
          }
        });
    }
  }
}
