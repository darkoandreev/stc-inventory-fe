import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { IInventory } from 'src/app/tab2/store/models/inventory.model';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss'],
})
export class ViewInventoryComponent implements OnInit {
  @Input() inventory: IInventory;
  @Output() closeModal = new EventEmitter<any>();

  constructor(public navParams: NavParams,
              public modalController: ModalController,
              private alertController: AlertController,
              private router: Router) {}

  ngOnInit() {}

  editInventory() {
    this.modalController.dismiss();
    this.router.navigateByUrl(`/tabs/add-inventory/${this.inventory.id}`);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Okay',
          handler: () => {
            this.modalController.dismiss(this.inventory.id);
          }
        }
      ]
    });

    await alert.present();
  }

}
