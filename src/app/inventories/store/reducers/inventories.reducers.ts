import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { IInventory } from 'src/app/tab2/store/models/inventory.model';
import * as fromActions from '../actions/inventories.actions';
import { IResponse } from '../models/response.model';

export interface InventoriesState {
    inventories: IInventory[];
    response: IResponse;
}

export const initialState: InventoriesState = {
    inventories: null,
    response: null
}

const featureReducer = createReducer (
    initialState,
    on (fromActions.getInventories, state => ({
        ...state
    })),
    on (fromActions.getInventoriesSuccess, (state, {inventories} )=> ({
        ...state,
        inventories: inventories
    })),
    on (fromActions.deleteInventory, state => ({
        ...state
    })),
    on (fromActions.deleteInventorySuccess, (state, {response} )=> ({
        ...state,
        response: response
    }))
);

export interface State {
    inventories: InventoriesState
}

export const inventories = createFeatureSelector<InventoriesState>('inventories');
export const getInventories = createSelector(inventories,(state: InventoriesState) => state.inventories);
export const deleteInventory = createSelector(inventories,(state: InventoriesState) => state.response);

export function inventoriesReducer (state: InventoriesState | undefined, action: Action) {
    return featureReducer(state, action);
}