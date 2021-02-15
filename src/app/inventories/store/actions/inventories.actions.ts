import { createAction, props } from '@ngrx/store';
import { ICategory } from '../models/category.model';
import { IGetInventoriesParams } from '../models/get-inventories.param';
import { IInventory } from '../models/inventory.model';
import { IResponse } from '../models/response.model';
import { ISearchInventoriesParams } from '../models/search-inventories.params';

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
export const resetInventory = createAction(
  '[Inventories Page] Reset inventory form'
);

export const getInventories = createAction(
  '[Inventories Page] Get Inventories',
  props<{
    params: IGetInventoriesParams;
    reset: boolean;
  }>()
);
export const getInventoriesSuccess = createAction(
  '[Inventories Page] Get Inventories Success',
  props<{ inventories: IInventory[]; reset: boolean; total: number }>()
);
export const getInventoriesError = createAction(
  '[Inventories Page] Get Inventories Error',
  (error: Error) => error
);

export const searchInventories = createAction(
  '[Inventories Page] Search Inventories',
  props<{ params: ISearchInventoriesParams }>()
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

export const uploadInventoryImage = createAction(
  '[Create inventory] Upload inventory image',
  props<{ imageBlob: Blob; imageName: string }>()
);
export const uploadInventoryImageSuccess = createAction(
  '[Create inventory] Upload inventory image success',
  props<{ response: any }>()
);
export const uploadInventoryImageFailed = createAction(
  '[Create inventory] Upload inventory image failed',
  (error: Error) => error
);

// Export to PDF
export const exportToPdf = createAction(
  '[Inventories Page] Export inventories to PDF',
  props<{ categoryId: string }>()
);
export const exportToPdfSuccess = createAction(
  '[Inventories Page] Export inventories to PDF Success',
  props<{ file: Blob }>()
);
export const exportToPdfError = createAction(
  '[Inventories Page] Export inventories to PDF Error',
  (error: Error) => error
);

export const writeOffInventory = createAction(
  '[View Inventory Page] Write-off Inventory',
  props<{ inventoryId: string }>()
);
export const writeOffInventorySuccess = createAction(
  '[View Inventory Page] Write-off Inventory Success',
  props<{ inventory: Partial<IInventory> }>()
);
export const writeOffInventoryError = createAction(
  '[View Inventory Page] Write-off Inventory Error',
  (error: Error) => error
);

export const resetPdfFile = createAction('[Inventories Page] Reset pdf file');
