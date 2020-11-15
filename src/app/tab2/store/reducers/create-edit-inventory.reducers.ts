import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { IResponse } from 'src/app/inventories/store/models/response.model';
import * as fromActions from '../actions/create-edit-inventory.actions';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';

export interface CreateEditInventoryState {
    categories: ICategory[];
    editInventoryResponse: IResponse;
    inventory: IInventory;
}

export const initialState: CreateEditInventoryState = {
    categories: null,
    editInventoryResponse: null,
    inventory: null
}

const featureReducer = createReducer (
    initialState,
    on (fromActions.createItem, state => ({
        ...state
    })),
    on (fromActions.createItemSuccess, (state, {response} )=> ({
        ...state,
        response
    })),
    on (fromActions.getCategory, state => ({
        ...state
    })),
    on (fromActions.getCategorySuccess, (state, {categories} )=> ({
        ...state,
        categories
    })),
    on (fromActions.editInventory, state => ({
        ...state
    })),
    on (fromActions.editInventorySuccess, (state, {editInventoryResponse} )=> ({
        ...state,
        editInventoryResponse
    })),
    on (fromActions.getInventory, state => ({
        ...state
    })),
    on (fromActions.getInventorySuccess, (state, {inventory} )=> ({
        ...state,
        inventory
    }))
);

export interface State {
    createEditInventory: CreateEditInventoryState
}

export const createEditInventory = createFeatureSelector<CreateEditInventoryState>('createEditInventory');
export const getCategories = createSelector(createEditInventory,(state: CreateEditInventoryState) => state.categories);
export const editInventory = createSelector(createEditInventory,(state: CreateEditInventoryState) => state.editInventoryResponse);
export const getInventory = createSelector(createEditInventory,(state: CreateEditInventoryState) => state.inventory);


export function createEditInventoryReducer (state: CreateEditInventoryState | undefined, action: Action) {
    return featureReducer(state, action);
}