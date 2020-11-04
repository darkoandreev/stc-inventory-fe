import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoriesPage } from './inventories.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { InventoriesPageRoutingModule } from './inventories-routing.module';
import { InventoriesService } from './inventories.service';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { inventoriesReducer } from './store/reducers/inventories.reducers';
import { InventoriesEffects } from './store/effects/inventories.effects';
import { InventoriesFacade } from './store/facade/inventories.facade';
import { CreateEditInventoryFacade } from '../tab2/store/facade/create-edit-inventory.facade';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    InventoriesPageRoutingModule,
    StoreModule.forFeature('inventories', inventoriesReducer),
    EffectsModule.forFeature([InventoriesEffects]),
  ],
  declarations: [InventoriesPage, InventoryListComponent],
  providers: [InventoriesService, InventoriesFacade, CreateEditInventoryFacade]
})
export class InventoriesModule {}
