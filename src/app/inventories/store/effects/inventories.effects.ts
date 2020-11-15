import { Action } from "@ngrx/store";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/inventories.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InventoriesService } from '../../inventories.service';
import { IInventory } from 'src/app/tab2/store/models/inventory.model';
import { Router } from '@angular/router';
import { IResponse } from '../models/response.model';

class EffectError implements Action {
    readonly type = '[Error] Effect Error Inventories';
}

@Injectable()
export class InventoriesEffects {
    constructor(private actions$: Actions,
                private service: InventoriesService,
                private router: Router) {}
    
    getInventories$ = createEffect (() => 
    this.actions$.pipe(
        ofType(fromActions.getInventories),
        switchMap((action) =>
            this.service.getInventories(action.categoryId, action.isAmortization).pipe(
                map((inventories: IInventory[]) => fromActions.getInventoriesSuccess({inventories})),
                catchError(() => of(new EffectError()))
            ))
        )
    );

    searchInventories$ = createEffect (() => 
    this.actions$.pipe(
        ofType(fromActions.searchInventories),
        switchMap((action) =>
            this.service.searchInventories(action.searchTerm, action.categoryId, action.isAmortization).pipe(
                map((inventories: IInventory[]) => fromActions.getInventoriesSuccess({inventories})),
                catchError(() => of(new EffectError()))
            ))
        )
    );

    deleteInventory$ = createEffect (() => 
    this.actions$.pipe(
        ofType(fromActions.deleteInventory),
        switchMap((action) =>
            this.service.deleteInventory(action.id).pipe(
                map((response: IResponse) => fromActions.deleteInventorySuccess({response})),
                catchError(() => of(new EffectError()))
            ))
        )
    );

    deleteInventorySuccess$ = createEffect ( () =>
        this.actions$.pipe(
            ofType(fromActions.deleteInventorySuccess),
            tap(() => this.router.navigateByUrl('/tabs/inventories'))
        ),{dispatch: false}
    );
}