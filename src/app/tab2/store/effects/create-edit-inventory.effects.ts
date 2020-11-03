import { Action } from "@ngrx/store";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/create-edit-inventory.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CreateEditInventoryService } from '../../create-edit-inventory.service';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';

class EffectError implements Action {
    readonly type = '[Error] Effect Error Create Edit Inventory';
}

@Injectable()
export class CreateEditInventoryEffects {
    constructor(private actions$: Actions,
                private service: CreateEditInventoryService) {}
    
    createNewItem$ = createEffect (() => 
    this.actions$.pipe(
        ofType(fromActions.createItem),
        switchMap((action) =>
            this.service.createNewItem(action.inventory).pipe(
                map((response: IInventory) => fromActions.createItemSuccess({response})),
                catchError(() => of(new EffectError()))
            ))
        )
    );

    categories$ = createEffect (() => 
    this.actions$.pipe(
        ofType(fromActions.getCategory),
        switchMap(() =>
            this.service.getCategories().pipe(
                map((categories: ICategory[]) => fromActions.getCategorySuccess({categories})),
                catchError(() => of(new EffectError()))
            ))
        )
    );
}