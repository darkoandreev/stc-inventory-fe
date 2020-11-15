import { createAction, props } from '@ngrx/store';
import { IInventory } from 'src/app/tab2/store/models/inventory.model';
import { IResponse } from '../models/response.model';

export const getInventories = createAction('[Inventories Page] Get Inventories', props<{ categoryId?: string, isAmortization?: boolean }>());
export const getInventoriesSuccess = createAction('[Inventories Page] Get Inventories Success', props<{ inventories: IInventory[] }>());
export const searchInventories = createAction('[Inventories Page] Search Inventories', props<{ searchTerm: string, categoryId: string, isAmortization: boolean }>());
export const deleteInventory = createAction('[Inventories Page] Delete Inventory', props<{ inventory_id: string }>());
export const deleteInventorySuccess = createAction('[Inventories Page] Delete Inventory Success', props<{ response: IResponse }>());