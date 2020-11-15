import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditInventoryPage } from './create-edit-inventory.page';
import { CreateEditInventoryEffects } from './store/effects/create-edit-inventory.effects';

const routes: Routes = [
  {
    path: '',
    component: CreateEditInventoryPage
  },
  {
    path: ':id',
    component: CreateEditInventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEditInventoryRoutingModule {}
