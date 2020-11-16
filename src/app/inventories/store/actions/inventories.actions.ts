import { createAction, props } from '@ngrx/store';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';
import { IResponse } from '../models/response.model';

export const createItem = createAction('[Create Edit Inventory Page] Create new inventory', props<{ inventory: IInventory} >());
export const createItemSuccess = createAction('[Create Edit Inventory Page] Create new inventory - Success', props<{ inventory: IInventory }>());

export const getCategory = createAction('[Create Edit Inventory Page] Get Category');
export const getCategorySuccess = createAction('[Create Edit Inventory Page] Get Category Success', props<{ categories: ICategory[] }>());

export const editInventory = createAction('[Create Edit Inventory Page] Edit Inventory', props<{ inventory: IInventory }>());
export const editInventorySuccess = createAction('[Create Edit Inventory Page] Edit Inventory Success', props<{ editInventoryResponse: IResponse }>());

export const getInventory = createAction('[Create Edit Inventory Page] Get Inventory', props<{ id: string }>());
export const getInventorySuccess = createAction('[Create Edit Inventory Page] Get Inventory Success', props<{ inventory: IInventory }>());

export const getInventories = createAction('[Inventories Page] Get Inventories', props<{ categoryId?: string, isAmortization?: boolean }>());
export const getInventoriesSuccess = createAction('[Inventories Page] Get Inventories Success', props<{ inventories: IInventory[] }>());

export const searchInventories = createAction('[Inventories Page] Search Inventories', props<{ searchTerm: string, categoryId: string, isAmortization: boolean }>());

export const deleteInventory = createAction('[Inventories Page] Delete Inventory', props<{ id: string }>());
export const deleteInventorySuccess = createAction('[Inventories Page] Delete Inventory Success', props<{ response: IResponse }>());