import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/inventories.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { InventoriesService } from '../services/inventories.service';
import { Router } from '@angular/router';
import { IInventory } from '../models/inventory.model';
import { ICategory } from '../models/category.model';
import { IResponse } from '../models/response.model';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Injectable()
export class InventoriesEffects {
  constructor(
    private actions$: Actions,
    private service: InventoriesService,
    private router: Router,
    private toast: ToasterService
  ) {}

  createNewItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createItem),
      switchMap((action) =>
        this.service.createNewItem(action.inventory).pipe(
          map((inventory: IInventory) =>
            fromActions.createItemSuccess({ inventory })
          ),
          catchError((error: Error) => [fromActions.createItemsError(error)])
        )
      )
    )
  );

  categories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getCategories),
      switchMap(() =>
        this.service.getCategories().pipe(
          map((categories: ICategory[]) =>
            fromActions.getCategoriesSuccess({ categories })
          ),
          catchError((error: Error) => [fromActions.getCategoriesError(error)])
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
          catchError((error: Error) => [fromActions.editInventoryError(error)])
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
          catchError((error: Error) => [fromActions.getInventoryError(error)])
        )
      )
    )
  );

  getInventories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getInventories),
      switchMap((action) =>
        this.service
          .getInventories(
            action.categoryId,
            action.isAmortization,
            action.skip,
            action.take
          )
          .pipe(
            map((inventories: IInventory[]) =>
              fromActions.getInventoriesSuccess({
                inventories,
                reset: action.reset,
              })
            ),
            catchError((error: Error) => [
              fromActions.getInventoriesError(error),
            ])
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
            catchError((error: Error) => [
              fromActions.searchInventoriesError(error),
            ])
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
          catchError((error: Error) => [
            fromActions.deleteInventoryError(error),
          ])
        )
      )
    )
  );

  deleteInventorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.deleteInventorySuccess),
        tap(({ response }) => {
          this.router.navigateByUrl('/tabs/inventories');
          this.toast.showToaster(response.message, 'success');
        })
      ),
    { dispatch: false }
  );

  createEditInventorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createItemSuccess, fromActions.editInventorySuccess),
        tap(() => {
          this.toast.showToaster('Produkt je uspešno dodat', 'success');
        })
      ),
    { dispatch: false }
  );
}
