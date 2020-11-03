import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditInventoryPage } from './create-edit-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditInventoryPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEditInventoryRoutingModule {}
