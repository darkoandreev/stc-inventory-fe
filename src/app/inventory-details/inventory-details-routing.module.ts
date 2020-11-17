import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryDetailsPage } from './inventory-details.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryDetailsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryDetailsRoutingModule {}
