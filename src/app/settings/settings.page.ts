import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../core/services/storage/storage.service';
import { ILanguage } from './models/language.interface';

@Component({
  selector: 'stc-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  readonly languages: ILanguage[] = [
    {
      label: 'SETTINGS.LANGUAGES.SERBIAN',
      code: 'sr',
    },
    {
      label: 'SETTINGS.LANGUAGES.ENGLISH',
      code: 'en',
    },
  ];

  selectedLanguage: ILanguage;

  constructor(
    private translationService: TranslateService,
    private storageService: StorageService<ILanguage>
  ) {}

  ngOnInit(): void {
    const currentLanguage = this.languages.find(
      (lang) => lang.code === this.storageService.getItem('language')?.code
    );
    this.selectedLanguage = currentLanguage ?? this.languages[0];
  }

  changeLanguage(event: CustomEvent): void {
    const language: ILanguage = event.detail?.value;
    this.translationService.use(language.code);
    this.storageService.setItem('language', language);
    this.selectedLanguage = language;
  }
}
