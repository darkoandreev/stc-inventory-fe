import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private translateService: TranslateService
  ) {}

  async presentConfirmationAlert(
    header: string,
    message: string,
    handler: () => void
  ): Promise<any> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: this.translateService.instant(
            'SHARED.DELETE_CONFIRM_DIALOG.NO_BUTTON_TEXT'
          ),
          role: 'cancel',
        },
        {
          text: this.translateService.instant(
            'SHARED.DELETE_CONFIRM_DIALOG.YES_BUTTON_TEXT'
          ),
          handler,
        },
      ],
    });

    await alert.present();
  }
}
