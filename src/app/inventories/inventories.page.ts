import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ViewInventoryComponent } from './components/view-inventory/view-inventory.component';
import { InventoriesFacade } from './store/facade/inventories.facade';
import { ICategory } from './store/models/category.model';
import { IInventory } from './store/models/inventory.model';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalService } from '../core/services/modal/modal.service';
import { IGetInventoriesParams } from './store/models/get-inventories.param';
import {
  defaultIfEmpty,
  filter,
  finalize,
  last,
  map,
  skip,
  startWith,
  take,
  takeUntil,
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { LoadingService } from '../core/services/loading/loading.service';

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
  private destroyed$ = new Subject<void>();

  constructor(
    private barcodeScanner: BarcodeScanner,
    private modalService: ModalService,
    public platform: Platform,
    public facade: InventoriesFacade,
    private loadingService: LoadingService,
    private file: File,
    private fileOpener: FileOpener
  ) {}

  ionViewWillEnter(): void {
    this.skip = 0;
    this.facade.getCategories();
    this.facade.getInventories(this.inventoriesParams);
  }

  ionViewWillLeave(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getInventories(event: CustomEvent, type: string): void {
    this.skip = 0;
    if (type === 'checkbox') {
      this.selectedIsAmortization = event.detail.checked;
    }

    if (type === 'select') {
      const category: ICategory = event.detail.value;

      this.categoryId = category?.id || null;
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
    console.log(barcodeResult.text);

    const barcodeInventory: IInventory = JSON.parse(barcodeResult.text);

    this.facade.getInventory(barcodeInventory?.id);
    this.facade.inventory$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inventory) => {
        this.viewInventoryModal(inventory);
      });
    //      this.facade.createNewItem(inventory);
  }

  async viewInventoryModal(inventory: IInventory): Promise<void> {
    const { data } = await this.modalService.presentModal(
      { inventory },
      ViewInventoryComponent
    );
    if (!data) {
      return;
    }

    if (!data?.writeOff) {
      this.facade.deleteInventory(data);
      return;
    }

    this.facade.writeOff(data.inventoryId);
  }

  exportToPdf(): void {
    this.loadingService.presentLoading('export-to-pdf');
    this.facade.exportToPdf(this.categoryId);
    this.facade.pdfFile$
      .pipe(
        finalize(() => {
          this.facade.resetPdfFile();
          this.loadingService.hideLoading('export-to-pdf');
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe(async (file) => {
        if (this.platform.is('cordova')) {
          const fileName = `stc_popisna_list_${new Date().getFullYear()}`;

          const fileEntry = await this.file.writeFile(
            this.file.dataDirectory,
            fileName,
            file,
            { replace: true }
          );

          if (!fileEntry) {
            return;
          }

          this.fileOpener.open(
            this.file.dataDirectory + fileName,
            'application/pdf'
          );
        } else {
          const downloadURL = window.URL.createObjectURL(file);
          window.open(downloadURL);
        }
      });
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
