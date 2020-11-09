import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  inventoryIcon: string;
  addInventoryIcon: string;

  changeTab({ tab }): void {
    this.inventoryIcon = tab === 'inventories' ? 'list-sharp' : 'list-outline';
    this.addInventoryIcon = tab === 'add-inventory' ? 'add-circle-sharp' : 'add-circle-outline'
  }
}
