import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditInventoryPage } from './create-edit-inventory.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CreateEditInventoryRoutingModule } from './create-edit-inventory-routing.module';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CreateEditInventoryService } from './create-edit-inventory.service';
import { CreateEditInventoryFacade } from './store/facade/create-edit-inventory.facade';
import { createEditInventoryReducer } from './store/reducers/create-edit-inventory.reducers';
import { CreateEditInventoryEffects } from './store/effects/create-edit-inventory.effects';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    CreateEditInventoryRoutingModule,
    StoreModule.forFeature('createEditInventory', createEditInventoryReducer),
    EffectsModule.forFeature([CreateEditInventoryEffects]),
  ],
  declarations: [CreateEditInventoryPage, InventoryFormComponent],
  providers: [CreateEditInventoryService, CreateEditInventoryFacade]
})
export class CreateEditInventoryModule {}
