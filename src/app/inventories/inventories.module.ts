import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoriesPage } from './inventories.page';
import { InventoriesPageRoutingModule } from './inventories-routing.module';
import { InventoriesService } from './store/services/inventories.service';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoriesFacade } from './store/facade/inventories.facade';
import { ViewInventoryComponent } from './components/view-inventory/view-inventory/view-inventory.component';
import { InventoriesStoreModule } from './store/inventories-store.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InventoriesPageRoutingModule,
    InventoriesStoreModule
  ],
  declarations: [InventoriesPage, InventoryListComponent, ViewInventoryComponent],
  providers: [InventoriesService, InventoriesFacade]
})
export class InventoriesModule {}
