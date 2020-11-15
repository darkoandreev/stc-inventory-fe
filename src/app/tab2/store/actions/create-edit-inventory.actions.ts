import { createAction, props } from '@ngrx/store';
import { IResponse } from 'src/app/inventories/store/models/response.model';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';

export const createItem = createAction('[Create Edit Inventory Page] Create New Item', props<{inventory: IInventory}>());
export const createItemSuccess = createAction('[Create Edit Inventory Page] Create New Item Success', props<{response: IInventory}>());

export const getCategory = createAction('[Create Edit Inventory Page] Get Category');
export const getCategorySuccess = createAction('[Create Edit Inventory Page] Get Category Success', props<{categories: ICategory[]}>());

export const editInventory = createAction('[Create Edit Inventory Page] Edit Inventory', props<{inventory: IInventory}>());
export const editInventorySuccess = createAction('[Create Edit Inventory Page] Edit Inventory Success', props<{editInventoryResponse: IResponse}>());

export const getInventory = createAction('[Create Edit Inventory Page] Get Inventory', props<{id: string}>());
export const getInventorySuccess = createAction('[Create Edit Inventory Page] Get Inventory Success', props<{inventory: IInventory}>());