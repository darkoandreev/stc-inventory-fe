import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as fromAction from '../actions/inventories.actions';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';
import { State } from '../reducers';
import {
  getAllInventories,
  getAllCategories,
  getInventory,
  getTotalAmount,
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
  inventory$: Observable<IInventory> = this.store.pipe(select(getInventory));
  totalAmount$: Observable<number> = this.store.pipe(select(getTotalAmount));

  constructor(private store: Store<State>) {}

  getInventories(
    categoryId: string,
    isAmortization: boolean,
    skip: number,
    take: number,
    reset: boolean = true
  ) {
    this.store.dispatch(
      fromAction.getInventories({
        categoryId,
        isAmortization,
        skip,
        take,
        reset,
      })
    );
  }

  searchInventories(
    searchTerm: string,
    categoryId: string,
    isAmortization: boolean
  ): void {
    this.store.dispatch(
      fromAction.searchInventories({ searchTerm, categoryId, isAmortization })
    );
  }

  deleteInventory(id: string): void {
    this.store.dispatch(fromAction.deleteInventory({ id }));
  }

  createNewItem(inventory: IInventory) {
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
}
