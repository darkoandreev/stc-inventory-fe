import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateEditInventoryFacade } from '../tab2/store/facade/create-edit-inventory.facade';
import { ICategory } from '../tab2/store/models/category.model';
import { IInventory } from '../tab2/store/models/inventory.model';
import { ViewInventoryComponent } from './components/view-inventory/view-inventory/view-inventory.component';
import { InventoriesFacade } from './store/facade/inventories.facade';

@Component({
  selector: 'app-inventories',
  templateUrl: 'inventories.page.html',
  styleUrls: ['inventories.page.scss']
})
export class InventoriesPage {
  selectedCategory: ICategory;
  selectedIsAmortization = false;
  categoryId: string = '1';

  constructor(public facadeInventories: InventoriesFacade,
              private modalController: ModalController,
              public facade: CreateEditInventoryFacade) {}

  ionViewWillEnter(): void {
    this.facade.getCategories();
    this.facadeInventories.getInventories(this.categoryId, this.selectedIsAmortization);
  }

  getInventories(event: CustomEvent, type: string) {
    if (type === 'checkbox') {
      this.selectedIsAmortization = event.detail.checked;
    }

    if (type === 'select') {
      this.categoryId = event.detail.value;
    }
    this.facadeInventories.getInventories(this.categoryId, this.selectedIsAmortization);
  }

  searchInventory(event: CustomEvent): void {
    this.facadeInventories.searchInventories(event.detail.value, this.categoryId, this.selectedIsAmortization);
  }

  async presentModal(inventory: IInventory) {
    const modal = await this.modalController.create({
      component: ViewInventoryComponent,
      componentProps: {inventory}
    });
    await modal.present();
    const { data } = (await modal.onDidDismiss());
    this.facadeInventories.deleteInventory(data);
  }
}
