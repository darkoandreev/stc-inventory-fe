import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/create-edit-inventory.actions';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';

export interface CreateEditInventoryState {
    response: IInventory;
    categories: ICategory[];
}

export const initialState: CreateEditInventoryState = {
    response: null,
    categories: null
}

const featureReducer = createReducer (
    initialState,
    on (fromActions.createItem, state => ({
        ...state
    })),
    on (fromActions.createItemSuccess, (state, {response} )=> ({
        ...state,
        response: response
    })),
    on (fromActions.getCategory, state => ({
        ...state
    })),
    on (fromActions.getCategorySuccess, (state, {categories} )=> ({
        ...state,
        categories: categories
    }))
);

export interface State {
    createEditInventory: CreateEditInventoryState
}

export const createEditInventory = createFeatureSelector<CreateEditInventoryState>('createEditInventory');
export const getCategories = createSelector(createEditInventory,(state: CreateEditInventoryState) => state.categories);

export function createEditInventoryReducer (state: CreateEditInventoryState | undefined, action: Action) {
    return featureReducer(state, action);
}