import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
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
    private router: Router
  ) {}

  editInventory() {
    this.modalController.dismiss();
    this.router.navigate(['tabs', 'add-inventory'], {
      queryParams: { id: this.inventory.id },
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Brisanje proizvoda',
      message:
        'Da li ste sigurni da želite <strong>obrisati</strong> ovaj proizvod?',
      buttons: [
        {
          text: 'Ne',
          role: 'cancel',
        },
        {
          text: 'Da',
          handler: () => {
            this.modalController.dismiss(this.inventory.id);
          },
        },
      ],
    });

    await alert.present();
  }
}
