import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, skip, take } from 'rxjs/operators';
import * as fromAction from '../actions/inventories.actions';
import { ICategory } from '../models/category.model';
import { IGetInventoriesParams } from '../models/get-inventories.param';
import { IInventory } from '../models/inventory.model';
import { ISearchInventoriesParams } from '../models/search-inventories.params';
import { State } from '../reducers';
import {
  getAllInventories,
  getAllCategories,
  getInventory,
  getPdfFile,
} from '../selectors';

@Injectable({ providedIn: 'root' })
export class InventoriesFacade {
  inventories$: Observable<IInventory[]> = this.store.pipe(
    select(getAllInventories)
  );
  categories$: Observable<ICategory[]> = this.store.pipe(
    select(getAllCategories),
    filter((x) => !!x && x.length > 0)
  );
  inventory$: Observable<IInventory> = this.store.pipe(
    select(getInventory),
    skip(1),
    take(1)
  );
  pdfFile$: Observable<Blob> = this.store.pipe(select(getPdfFile)).pipe(
    filter((file) => !!file),
    take(1)
  );

  constructor(private store: Store<State>) {}

  getInventories(params: IGetInventoriesParams, reset: boolean = true): void {
    this.store.dispatch(
      fromAction.getInventories({
        params,
        reset,
      })
    );
  }

  searchInventories(params: ISearchInventoriesParams): void {
    this.store.dispatch(fromAction.searchInventories({ params }));
  }

  resetInventory(): void {
    this.store.dispatch(fromAction.resetInventory());
  }

  deleteInventory(id: string): void {
    this.store.dispatch(fromAction.deleteInventory({ id }));
  }

  createNewItem(inventory: IInventory): void {
    this.store.dispatch(fromAction.createItem({ inventory }));
  }

  getCategories(): void {
    this.store.dispatch(fromAction.getCategories());
  }

  editInventory(inventory: IInventory): void {
    this.store.dispatch(fromAction.editInventory({ inventory }));
  }

  getInventory(id: string): void {
    this.store.dispatch(fromAction.getInventory({ id }));
  }

  uploadImage(imageBlob: Blob, imageName: string): void {
    this.store.dispatch(
      fromAction.uploadInventoryImage({ imageBlob, imageName })
    );
  }

  exportToPdf(categoryId: string): void {
    this.store.dispatch(fromAction.exportToPdf({ categoryId }));
  }

  resetPdfFile(): void {
    this.store.dispatch(fromAction.resetPdfFile());
  }

  writeOff(inventoryId: string): void {
    this.store.dispatch(fromAction.writeOffInventory({ inventoryId }));
  }
}
