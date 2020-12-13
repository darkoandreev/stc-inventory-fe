import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './core/services/storage/storage.service';
import { ILanguage } from './settings/models/language.interface';

@Component({
  selector: 'stc-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storageService: StorageService<ILanguage>,
    private translateService: TranslateService
  ) {
    this.initializeApp();
  }

  private initializeApp(): void {
    this.translateService.use(
      this.storageService.getItem('language')?.code || 'sr'
    );
  }
}
