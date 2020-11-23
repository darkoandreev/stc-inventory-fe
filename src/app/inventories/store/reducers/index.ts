import { ActionReducerMap } from '@ngrx/store';
import * as fromInventories from './inventories.reducers';

export interface State {
  readonly inventories: fromInventories.InventoriesState;
}

export const reducers: ActionReducerMap<State> = {
  inventories: fromInventories.inventoriesReducer,
};
