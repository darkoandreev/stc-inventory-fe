import { Component } from '@angular/core';
import { InventoriesFacade } from '../inventories/store/facade/inventories.facade';
import { IInventory } from '../inventories/store/models/inventory.model';

@Component({
  selector: 'stc-inventory-details',
  templateUrl: 'inventory-details.page.html',
  styleUrls: ['inventory-details.page.scss']
})
export class InventoryDetailsPage {

  constructor(private facade: InventoriesFacade) {}

  submitInventory(inventory: IInventory) {
    if (inventory.id) {
      this.facade.editInventory(inventory);
      return;
    }
    this.facade.createNewItem(inventory);
  }
}