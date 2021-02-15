import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IInventory } from 'src/app/inventories/store/models/inventory.model';
import { AlertService } from '../../../core/services/alert/alert.service';

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
    private router: Router,
    private translateService: TranslateService,
    private alertService: AlertService
  ) {}

  editInventory(): void {
    this.modalController.dismiss();
    this.router.navigate(['tabs', 'add-inventory', this.inventory.id]);
  }

  deleteConfirmation(): void {
    this.alertService.presentConfirmationAlert(
      this.translateService.instant('SHARED.DELETE_CONFIRM_DIALOG.HEADER'),
      this.translateService.instant('SHARED.DELETE_CONFIRM_DIALOG.MESSAGE'),
      () => this.modalController.dismiss(this.inventory.id)
    );
  }

  writeOffConfirmation(): void {
    this.alertService.presentConfirmationAlert(
      this.translateService.instant('SHARED.WRITE_OFF_CONFIRM_DIALOG.HEADER'),
      this.translateService.instant('SHARED.WRITE_OFF_CONFIRM_DIALOG.MESSAGE'),
      () =>
        this.modalController.dismiss({
          inventoryId: this.inventory.id,
          writeOff: true,
        })
    );
  }
}
