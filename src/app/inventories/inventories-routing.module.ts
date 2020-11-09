import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoriesPage } from './inventories.page';

const routes: Routes = [
  {
    path: '',
    component: InventoriesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoriesPageRoutingModule {}