import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/inventories.actions';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';

export interface InventoriesState extends EntityState<IInventory> {
    categories: ICategory[];
    selectedInventory: IInventory;
}

export const adapter: EntityAdapter<IInventory> = createEntityAdapter<IInventory>();

const initialState: InventoriesState = adapter.getInitialState({
    categories: [],
    selectedInventory: null
});

const featureReducer = createReducer(
    initialState,
    on(fromActions.getInventoriesSuccess, (state, { inventories }) => adapter.setAll(inventories, state)),
    on(fromActions.deleteInventorySuccess, (state, { response }) => adapter.removeOne(response.data.id, state)),
    on(fromActions.createItemSuccess, (state, { inventory }) => adapter.addOne(inventory, state)),
    on(fromActions.editInventorySuccess, (state, { editInventoryResponse } ) => adapter.updateOne({ id: editInventoryResponse.data.id, changes: editInventoryResponse.data }, state)),
    on(fromActions.getInventorySuccess, (state, { inventory }) => ({
        ...state,
        selectedInventory: inventory
    })),
    on(fromActions.getCategorySuccess, (state, { categories })=> ({
        ...state,
        categories
    }))
);

export function inventoriesReducer(state: InventoriesState | undefined, action: Action) {
    return featureReducer(state, action);
}