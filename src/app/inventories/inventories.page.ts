import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewInventoryComponent } from './components/view-inventory/view-inventory.component';
import { InventoriesFacade } from './store/facade/inventories.facade';
import { ICategory } from './store/models/category.model';
import { IInventory } from './store/models/inventory.model';

@Component({
  selector: 'stc-inventories',
  templateUrl: 'inventories.page.html',
  styleUrls: ['inventories.page.scss'],
})
export class InventoriesPage {
  selectedCategory: ICategory;
  selectedIsAmortization = false;
  categoryId = '1';
  skip: number = 0;
  take: number = 8;

  constructor(
    private modalController: ModalController,
    public facade: InventoriesFacade
  ) {}

  ionViewWillEnter(): void {
    this.facade.getCategories();
    this.facade.getInventories(this.categoryId, this.selectedIsAmortization, this.skip, this.take);
  }

  getInventories(event: CustomEvent, type: string) {
    this.skip = 0;
    if (type === 'checkbox') {
      this.selectedIsAmortization = event.detail.checked;
    }

    if (type === 'select') {
      this.categoryId = event.detail.value;
    }
    this.facade.getInventories(this.categoryId, this.selectedIsAmortization, this.skip, this.take);
  }

  infiniteScroll(event: any): void {
    this.skip += 8;
    this.facade.getInventories(this.categoryId, this.selectedIsAmortization, this.skip, this.take, false);
    event.target?.complete();
  }

  searchInventory(event: CustomEvent): void {
    if (!event.detail.value) {
      this.facade.getInventories(this.categoryId, this.selectedIsAmortization, this.skip, this.take);
      return;
    }
    this.facade.searchInventories(
      event.detail.value,
      this.categoryId,
      this.selectedIsAmortization
    );
  }

  change(): void {}

  async presentModal(inventory: IInventory) {
    const modal = await this.modalController.create({
      component: ViewInventoryComponent,
      componentProps: { inventory },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) {
      return;
    }
    this.facade.deleteInventory(data);
  }
}
