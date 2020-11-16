import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewInventoryComponent } from './components/view-inventory/view-inventory/view-inventory.component';
import { InventoriesFacade } from './store/facade/inventories.facade';
import { ICategory } from './store/models/category.model';
import { IInventory } from './store/models/inventory.model';

@Component({
  selector: 'stc-inventories',
  templateUrl: 'inventories.page.html',
  styleUrls: ['inventories.page.scss']
})
export class InventoriesPage {
  selectedCategory: ICategory;
  selectedIsAmortization = false;
  categoryId: string = '1';

  constructor(private modalController: ModalController,
              public facade: InventoriesFacade) {}

  ionViewWillEnter(): void {
    this.facade.getCategories();
    this.facade.getInventories(this.categoryId, this.selectedIsAmortization);
  }

  getInventories(event: CustomEvent, type: string) {
    if (type === 'checkbox') {
      this.selectedIsAmortization = event.detail.checked;
    }

    if (type === 'select') {
      this.categoryId = event.detail.value;
    }
    this.facade.getInventories(this.categoryId, this.selectedIsAmortization);
  }

  searchInventory(event: CustomEvent): void {
    this.facade.searchInventories(event.detail.value, this.categoryId, this.selectedIsAmortization);
  }

  async presentModal(inventory: IInventory) {
    const modal = await this.modalController.create({
      component: ViewInventoryComponent,
      componentProps: {inventory}
    });
    await modal.present();
    const { data } = (await modal.onDidDismiss());
    if (!data) {
      return;
    }
    this.facade.deleteInventory(data);
  }
}
