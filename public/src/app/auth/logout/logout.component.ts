import { Component, OnInit } from '@angular/core';
import { LogoutService } from './logout.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { logout } from '../../common/Utils';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [ LogoutService ]
})
export class LogoutComponent implements OnInit {

  constructor(
    private logoutSvc: LogoutService,
    private msgSvc: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.logoutSvc.logout().subscribe(() => {
      this.msgSvc.add({severity: 'success', summary: 'Success', detail: 'Successfully logout!'});
      this.router.navigateByUrl('/home');
    });
  }

}
