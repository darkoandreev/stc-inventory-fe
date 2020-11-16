import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { CreateEditInventoryService } from './inventory-details.service';
import { Camera } from '@ionic-native/camera/ngx';
import { ConnectInventoryFormDirective } from './directives/connect-inventory-form.directive';
import { InventoriesStoreModule } from '../inventories/store/inventories-store.module';
import { InventoryDetailsRoutingModule } from './inventory-details-routing.module';
import { InventoryDetailsPage } from './inventory-details.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InventoryDetailsRoutingModule,
    InventoriesStoreModule
  ],
  declarations: [InventoryDetailsPage, InventoryFormComponent, ConnectInventoryFormDirective],
  providers: [CreateEditInventoryService, Camera]
})
export class InventoryDetailsModule {}