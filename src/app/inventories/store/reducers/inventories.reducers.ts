import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { IInventory } from 'src/app/tab2/store/models/inventory.model';
import * as fromActions from '../actions/inventories.actions';

export interface InventoriesState {
    inventories: IInventory[];
}

export const initialState: InventoriesState = {
    inventories: null
}

const featureReducer = createReducer (
    initialState,
    on (fromActions.getInventories, state => ({
        ...state
    })),
    on (fromActions.getInventoriesSuccess, (state, {inventories} )=> ({
        ...state,
        inventories: inventories
    }))
);

export interface State {
    inventories: InventoriesState
}

export const inventories = createFeatureSelector<InventoriesState>('inventories');
export const getInventories = createSelector(inventories,(state: InventoriesState) => state.inventories);

export function inventoriesReducer (state: InventoriesState | undefined, action: Action) {
    return featureReducer(state, action);
}