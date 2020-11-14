import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IInventory } from 'src/app/tab2/store/models/inventory.model';
import { ViewInventoryComponent } from '../view-inventory/view-inventory/view-inventory.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryListComponent {
  @Input() inventories: IInventory[];
  
  constructor(public popoverController: PopoverController){}

  async presentPopover(inventory: IInventory) {
    const popover = await this.popoverController.create({
      component: ViewInventoryComponent,
      componentProps: {inventory: inventory},
      translucent: true
    });
    return await popover.present();
  }
}
