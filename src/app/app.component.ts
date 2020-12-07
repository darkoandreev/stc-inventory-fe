import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService<ILanguage>,
    private translateService: TranslateService
  ) {
    this.initializeApp();
  }

  async initializeApp(): Promise<void> {
    try {
      const ready = await this.platform.ready();
      if (ready) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.translateService.use(
          this.storageService.getItem('language')?.code || 'sr'
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}
