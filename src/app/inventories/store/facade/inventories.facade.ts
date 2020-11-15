import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IInventory } from 'src/app/tab2/store/models/inventory.model';
import * as fromAction from '../actions/inventories.actions';
import { IResponse } from '../models/response.model';
import * as fromReducer from '../reducers/inventories.reducers';

@Injectable()
export class InventoriesFacade {
    inventories$: Observable<IInventory[]> = this.store.pipe(select(fromReducer.getInventories));
    response$: Observable<IResponse> = this.store.pipe(select(fromReducer.deleteInventory));
    
    constructor(private store: Store<fromReducer.InventoriesState>){}

    getInventories(categoryId?: string, isAmortization?: boolean) {
        this.store.dispatch(fromAction.getInventories({categoryId, isAmortization}));
    }

    searchInventories(searchTerm: string, categoryId: string, isAmortization?: boolean): void {
        this.store.dispatch(fromAction.searchInventories({ searchTerm, categoryId, isAmortization }));
    }

    deleteInventory(id: string): void {
        this.store.dispatch(fromAction.deleteInventory({ id }));
    }
}