import { Component, ViewChild } from '@angular/core';
import { InventoriesFacade } from '../inventories/store/facade/inventories.facade';
import { IInventory } from '../inventories/store/models/inventory.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../inventories/store/models/category.model';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';

@Component({
  selector: 'stc-inventory-details',
  templateUrl: 'inventory-details.page.html',
  styleUrls: ['inventory-details.page.scss']
})
export class InventoryDetailsPage {
  @ViewChild(InventoryFormComponent) inventoryFormComponent: InventoryFormComponent;
  inventory$: Observable<IInventory> = this.facade.inventory$;
  categories$: Observable<ICategory[]> = this.facade.categories$;
  inventoryId: string;

  constructor(private facade: InventoriesFacade, private activatedRoute: ActivatedRoute) {}

  ionViewWillEnter() {
    this.inventoryId = this.activatedRoute.snapshot.queryParams?.id;
    if (this.inventoryId) {
      this.facade.getInventory(this.inventoryId);
    }
    this.facade.getCategories();
  }

  submitInventory(inventory: IInventory) {
    if (inventory.id) {
      this.facade.editInventory(inventory);
      return;
    }
    this.facade.createNewItem(inventory);
  }

  ionViewDidLeave(): void {
    this.inventoryFormComponent.inventoryForm.reset();
  }
}
