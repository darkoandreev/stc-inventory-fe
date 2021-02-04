import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IInventory } from 'src/app/inventories/store/models/inventory.model';

@Component({
  selector: 'stc-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss'],
})
export class ViewInventoryComponent {
  @Input() inventory: IInventory;
  @Output() closeModal = new EventEmitter<any>();

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private translateService: TranslateService
  ) {}

  editInventory(): void {
    this.modalController.dismiss();
    this.router.navigate(['tabs', 'add-inventory', this.inventory.id]);
  }

  async presentAlertConfirm(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.translateService.instant(
        'SHARED.DELETE_CONFIRM_DIALOG.HEADER'
      ),
      message: this.translateService.instant(
        'SHARED.DELETE_CONFIRM_DIALOG.MESSAGE'
      ),
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
          handler: () => {
            this.modalController.dismiss(this.inventory.id);
          },
        },
      ],
    });

    await alert.present();
  }
}
