import { Component } from '@angular/core';
import { CreateEditInventoryFacade } from './store/facade/create-edit-inventory.facade';
import { IInventory } from './store/models/inventory.model';

@Component({
  selector: 'app-create-edit-inventory',
  templateUrl: 'create-edit-inventory.page.html',
  styleUrls: ['create-edit-inventory.page.scss']
})
export class CreateEditInventoryPage {

  constructor(private facade: CreateEditInventoryFacade) {}

  submitInventory(inventory: IInventory) {
    if (inventory.id) {
      this.facade.editInventory(inventory);
      return;
    }
    this.facade.createNewItem(inventory);
  }
}