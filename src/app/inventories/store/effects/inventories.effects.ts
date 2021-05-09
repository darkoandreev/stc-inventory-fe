import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/inventories.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { InventoriesService } from '../services/inventories.service';
import { Router } from '@angular/router';
import { IInventoriesResponse, IInventory } from '../models/inventory.model';
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
      switchMap((action) => {
        const inventoriesByQuantity = [];

        for (let i = 0; i < action.inventory.quantity; i++) {
          inventoriesByQuantity.push(action.inventory);
        }

        return this.service.createNewItem(inventoriesByQuantity).pipe(
          map((inventories: IInventory[]) =>
            fromActions.createItemSuccess({ inventories })
          ),
          catchError((error: Error) => [fromActions.createItemsError(error)])
        );
      })
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
        this.service.getInventories(action.params).pipe(
          map((inventories: IInventory[]) =>
            fromActions.getInventoriesSuccess({
              inventories,
              reset: action.reset,
            })
          ),
          catchError((error: Error) => [fromActions.getInventoriesError(error)])
        )
      )
    )
  );

  searchInventories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.searchInventories),
      switchMap(({ params }) =>
        this.service.searchInventories(params).pipe(
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

  uploadInventoryImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.uploadInventoryImage),
      switchMap(({ imageBlob, imageName }) =>
        this.service.uploadInventoryImage(imageBlob, imageName).pipe(
          map((response) => fromActions.uploadInventoryImageSuccess(response)),
          catchError((error: Error) => [
            fromActions.uploadInventoryImageFailed(error),
          ])
        )
      )
    )
  );

  exportToPdf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.exportToPdf),
      switchMap(({ categoryId }) =>
        this.service.exportListToPdf(categoryId).pipe(
          map((file) => fromActions.exportToPdfSuccess({ file })),
          catchError((error: Error) => [fromActions.exportToPdfError(error)])
        )
      )
    )
  );

  writeOff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.writeOffInventory),
      switchMap(({ inventoryId }) =>
        this.service.writeOff(inventoryId).pipe(
          map((inventory) => {
            inventory.id = inventoryId;
            return fromActions.writeOffInventorySuccess({ inventory });
          }),
          catchError((error: Error) => [
            fromActions.writeOffInventoryError(error),
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

  uploadInventoryImageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.uploadInventoryImageSuccess),
        tap(() => {
          this.toast.showToaster('Slika je uploadovana uspešno', 'success');
        })
      ),
    { dispatch: false }
  );
}
