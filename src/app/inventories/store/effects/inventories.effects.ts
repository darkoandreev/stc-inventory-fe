import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from "../actions/inventories.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { InventoriesService } from "../services/inventories.service";
import { Router } from "@angular/router";
import { IInventory } from "../models/inventory.model";
import { ICategory } from '../models/category.model';
import { IResponse } from '../models/response.model';

class EffectError implements Action {
  readonly type = "[Error] Effect Error Inventories";
}

@Injectable()
export class InventoriesEffects {
  constructor(
    private actions$: Actions,
    private service: InventoriesService,
    private router: Router
  ) {}

  createNewItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createItem),
      switchMap((action) =>
        this.service.createNewItem(action.inventory).pipe(
          map((inventory: IInventory) =>
            fromActions.createItemSuccess({ inventory })
          ),
          catchError(() => of(new EffectError()))
        )
      )
    )
  );

  categories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getCategory),
      switchMap(() =>
        this.service.getCategories().pipe(
          map((categories: ICategory[]) =>
            fromActions.getCategorySuccess({ categories })
          ),
          catchError(() => of(new EffectError()))
        )
      )
    )
  );

  editInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.editInventory),
      switchMap((action) =>
        this.service.editInventory(action.inventory).pipe(
          map((editInventoryResponse: IResponse) =>
            fromActions.editInventorySuccess({ editInventoryResponse })
          ),
          catchError(() => of(new EffectError()))
        )
      )
    )
  );

  getInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getInventory),
      switchMap((action) =>
        this.service.getInventory(action.id).pipe(
          map((inventory: IInventory) =>
            fromActions.getInventorySuccess({ inventory })
          ),
          catchError(() => of(new EffectError()))
        )
      )
    )
  );

  getInventories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getInventories),
      switchMap((action) =>
        this.service
          .getInventories(action.categoryId, action.isAmortization, action.skip, action.take)
          .pipe(
            map((inventories: IInventory[]) =>
              fromActions.getInventoriesSuccess({ inventories, reset: action.reset })
            ),
            catchError(() => of(new EffectError()))
          )
      )
    )
  );

  searchInventories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.searchInventories),
      switchMap((action) =>
        this.service
          .searchInventories(
            action.searchTerm,
            action.categoryId,
            action.isAmortization
          )
          .pipe(
            map((inventories: IInventory[]) =>
              fromActions.searchInventoriesSuccess({ inventories })
            ),
            catchError(() => of(new EffectError()))
          )
      )
    )
  );

  deleteInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteInventory),
      switchMap((action) =>
        this.service.deleteInventory(action.id).pipe(
          map((response: IResponse) =>
            fromActions.deleteInventorySuccess({ response })
          ),
          catchError(() => of(new EffectError()))
        )
      )
    )
  );

  deleteInventorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.deleteInventorySuccess),
        tap(() => this.router.navigateByUrl("/tabs/inventories"))
      ),
    { dispatch: false }
  );
}
