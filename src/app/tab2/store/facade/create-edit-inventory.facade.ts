import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAction from '../actions/create-edit-inventory.actions';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';
import * as fromReducer from '../reducers/create-edit-inventory.reducers';
import { CreateEditInventoryState } from '../reducers/create-edit-inventory.reducers';

@Injectable()
export class CreateEditInventoryFacade {
    categories$: Observable<ICategory[]> = this.store.pipe(select(fromReducer.getCategories));
    
    constructor(private store: Store<CreateEditInventoryState>){}

    createNewItem(inventory: IInventory) {
        this.store.dispatch(fromAction.createItem({inventory}));
    }

    getCategories(): void {
        this.store.dispatch(fromAction.getCategory());
    }
}