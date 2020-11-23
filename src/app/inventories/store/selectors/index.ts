import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, InventoriesState } from '../reducers/inventories.reducers';

export const selectInventoriesState = createFeatureSelector<InventoriesState>(
  'inventories'
);

const {
  selectEntities,
  selectAll,
  selectIds,
  selectTotal,
} = adapter.getSelectors(selectInventoriesState);

// select the array of iventories
const selectInventories = selectAll;

export const getAllInventories = createSelector(
  selectInventoriesState,
  selectInventories
);

const selectCategories = createSelector(
  selectInventoriesState,
  (state) => state.categories
);

export const getAllCategories = createSelector(
  selectInventoriesState,
  selectCategories
);

const selectCurrentInventory = createSelector(
  selectInventoriesState,
  (state) => state.selectedInventory
);

export const getInventory = createSelector(
  selectInventoriesState,
  selectCurrentInventory
);
