import { Component, OnInit } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { translateEmitter } from '../Utils';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
  imports: [
    SelectButtonModule,
    FormsModule,
    NgOptimizedImage
  ],
  standalone: true,
  providers: [ TranslateService ]
})
export class LanguageComponent implements OnInit {

  protected countries: any[] = [];
  protected selectedCountry: any;
  constructor( private translate: TranslateService ) {
    this.countries = [
      { name: 'EN', flag: 'assets/resources/En.png' },
      { name: 'BG', flag: 'assets/resources/Bg.png' }];
  }

  ngOnInit() {}

  switchLang() {

    if (this.selectedCountry.name === 'BG') {
      this.translate.setDefaultLang('BG');
      this.translate.use('BG');
      translateEmitter.emit('BG');
    } else {
      this.translate.setDefaultLang('EN');
      this.translate.use('EN');
      translateEmitter.emit('EN');

    }
  }
}
