import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ViewInventoryComponent } from './components/view-inventory/view-inventory.component';
import { InventoriesFacade } from './store/facade/inventories.facade';
import { ICategory } from './store/models/category.model';
import { IInventory } from './store/models/inventory.model';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalService } from '../core/services/modal/modal.service';
import { IGetInventoriesParams } from './store/models/get-inventories.param';

@Component({
  selector: 'stc-inventories',
  templateUrl: 'inventories.page.html',
  styleUrls: ['inventories.page.scss'],
})
export class InventoriesPage {
  selectedCategory: ICategory;
  selectedIsAmortization = false;
  categoryId: string;

  private skip = 0;
  private take = 8;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private modalService: ModalService,
    public platform: Platform,
    public facade: InventoriesFacade
  ) {}

  ionViewWillEnter(): void {
    this.skip = 0;
    this.facade.getCategories();
    this.facade.getInventories(this.inventoriesParams);
  }

  getInventories(event: CustomEvent, type: string): void {
    this.skip = 0;
    if (type === 'checkbox') {
      this.selectedIsAmortization = event.detail.checked;
    }

    if (type === 'select') {
      const category: ICategory = event.detail.value;

      this.categoryId = category.id;
      if (category.name === 'Sve') {
        this.categoryId = null;
      }
    }
    this.facade.getInventories(this.inventoriesParams);
  }

  infiniteScroll(event: any): void {
    const { inventories } = event;
    if (inventories?.length % 8 === 0) {
      this.skip += 8;
      this.facade.getInventories(this.inventoriesParams, false);
    }
    event.event.target?.complete();
  }

  searchInventory(event: CustomEvent): void {
    if (!event.detail.value) {
      this.facade.getInventories(this.inventoriesParams);
      return;
    }
    this.facade.searchInventories({
      searchTerm: event.detail.value,
      categoryId: this.categoryId,
      isAmortization: this.selectedIsAmortization,
    });
  }

  async barcodeScan(): Promise<void> {
    const barcodeResult = await this.barcodeScanner.scan();

    if (!barcodeResult?.text) {
      return;
    }

    const inventory: IInventory = JSON.parse(barcodeResult.text);
    this.facade.createNewItem(inventory);
  }

  async viewInventoryModal(inventory: IInventory): Promise<void> {
    const { data } = await this.modalService.presentModal(
      { inventory },
      ViewInventoryComponent
    );
    if (!data) {
      return;
    }
    this.facade.deleteInventory(data);
  }

  private get inventoriesParams(): IGetInventoriesParams {
    return {
      skip: this.skip,
      take: this.take,
      categoryId: this.categoryId,
      isAmortization: this.selectedIsAmortization,
    };
  }
}
