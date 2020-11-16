import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InventoriesEffects } from './effects/inventories.effects';
import { reducers } from './reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('inventories', reducers),
        EffectsModule.forFeature([InventoriesEffects]),
    ]
})
export class InventoriesStoreModule { }
