import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'stc-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  async initializeApp(): Promise<void> {
    try {
      const ready = await this.platform.ready();
      if (ready) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
