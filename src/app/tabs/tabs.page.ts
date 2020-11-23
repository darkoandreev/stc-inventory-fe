import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'stc-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  inventoryIcon: string;
  addInventoryIcon: string;

  constructor(private router: Router) {}

  changeTab({ tab }): void {
    this.inventoryIcon = tab === 'inventories' ? 'list-sharp' : 'list-outline';
    this.addInventoryIcon =
      tab === 'add-inventory' ? 'add-circle-sharp' : 'add-circle-outline';
  }

  goToInventoryDetails(): void {
    this.router.navigate(['tabs', 'add-inventory']);
  }
}
