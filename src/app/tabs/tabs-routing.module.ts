import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inventories',
        loadChildren: () => import('../inventories/inventories.module').then(m => m.InventoriesModule)
      },
      {
        path: 'add-inventory',
        loadChildren: () => import('../tab2/create-edit-inventory.module').then(m => m.CreateEditInventoryModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inventories',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inventories',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
