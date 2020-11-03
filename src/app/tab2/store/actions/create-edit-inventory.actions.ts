import { createAction, props } from '@ngrx/store';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';

export const createItem = createAction('[Create Edit Inventory Page] Create New Item', props<{inventory: IInventory}>());
export const createItemSuccess = createAction('[Create Edit Inventory Page] Create New Item Success', props<{response: IInventory}>());

export const getCategory = createAction('[Create Edit Inventory Page] Get Category');
export const getCategorySuccess = createAction('[Create Edit Inventory Page] Get Category Success', props<{categories: ICategory[]}>());