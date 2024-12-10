import { Component, OnInit } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { translateEmitter } from '../Utils';
import {environment} from "../../../environments/environment";

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

  protected languageOptions =  [
    { id: 'en', label: 'EN', flag: 'assets/resources/En.png' },
    { id: 'bg', label: 'BG', flag: 'assets/resources/Bg.png' }
  ];

  protected selectedLanguage: { id: string, label: string, flag: string };

  constructor( private translate: TranslateService ) {}

  ngOnInit() {
    this.selectedLanguage = this.languageOptions.filter(language => language.id === environment.defaultLanguage)[0];
    this.switchLang();
  }

  protected switchLang() {
    if (this.selectedLanguage.label === 'BG') {
      this.translate.setDefaultLang('bg');
      this.translate.use('bg').subscribe( () => translateEmitter.emit('bg'));
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en').subscribe( () => translateEmitter.emit('en'));
    }
  }
}
