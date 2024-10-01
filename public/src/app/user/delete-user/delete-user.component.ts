import { Component, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { SharedModule } from "primeng/api";
import { deleteUser } from "../../common/Utils";

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    PanelModule,
    SharedModule
  ],
  templateUrl: './delete-user.component.html',
})
export class DeleteUserComponent implements OnInit {

  protected display = false;

  ngOnInit(): void {
     deleteUser.subscribe( data => this.display = data);
  }

  protected hide () {
    this.display = false;
    deleteUser.emit(false);
  }
}
