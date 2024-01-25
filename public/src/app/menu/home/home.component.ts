import { Component, OnInit} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    ButtonModule,
    RouterLink
  ],
  providers: []

})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
}
