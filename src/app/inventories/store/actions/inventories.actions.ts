import { createAction, props } from '@ngrx/store';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';
import { IResponse } from '../models/response.model';

export const createItem = createAction(
  '[Inventories Page] Create new inventory',
  props<{ inventory: IInventory }>()
);
export const createItemSuccess = createAction(
  '[Inventories Page] Create new inventory Success',
  props<{ inventory: IInventory }>()
);
export const createItemsError = createAction(
  '[Inventories Page] Create new inventory Error',
  (error: Error) => error
);

export const getCategories = createAction('[Inventories Page] Get Category');
export const getCategoriesSuccess = createAction(
  '[Inventories Page] Get Category Success',
  props<{ categories: ICategory[] }>()
);
export const getCategoriesError = createAction(
  '[Inventories Page] Get Category Error',
  (error: Error) => error
);

export const editInventory = createAction(
  '[Create Edit Inventory Page] Edit Inventory',
  props<{ inventory: IInventory }>()
);
export const editInventorySuccess = createAction(
  '[Create Edit Inventory Page] Edit Inventory Success',
  props<{ editInventoryResponse: IResponse }>()
);
export const editInventoryError = createAction(
  '[Inventories Page] Edit Inventory Error',
  (error: Error) => error
);

export const getInventory = createAction(
  '[Create Edit Inventory Page] Get Inventory',
  props<{ id: string }>()
);
export const getInventorySuccess = createAction(
  '[Create Edit Inventory Page] Get Inventory Success',
  props<{ inventory: IInventory }>()
);
export const getInventoryError = createAction(
  '[Inventories Page] Get Inventory Error',
  (error: Error) => error
);

export const getInventories = createAction(
  '[Inventories Page] Get Inventories',
  props<{
    categoryId: string;
    isAmortization: boolean;
    skip: number;
    take: number;
    reset: boolean;
  }>()
);
export const getInventoriesSuccess = createAction(
  '[Inventories Page] Get Inventories Success',
  props<{ inventories: IInventory[]; reset: boolean }>()
);
export const getInventoriesError = createAction(
  '[Inventories Page] Get Inventories Error',
  (error: Error) => error
);

export const searchInventories = createAction(
  '[Inventories Page] Search Inventories',
  props<{ searchTerm: string; categoryId: string; isAmortization: boolean }>()
);
export const searchInventoriesSuccess = createAction(
  '[Inventories Page] Search Inventories success',
  props<{ inventories: IInventory[] }>()
);
export const searchInventoriesError = createAction(
  '[Inventories Page] Get Inventories Error',
  (error: Error) => error
);

export const deleteInventory = createAction(
  '[Inventories Page] Delete Inventory',
  props<{ id: string }>()
);
export const deleteInventorySuccess = createAction(
  '[Inventories Page] Delete Inventory Success',
  props<{ response: IResponse }>()
);
export const deleteInventoryError = createAction(
  '[Inventories Page] Delete Inventory Error',
  (error: Error) => error
);
