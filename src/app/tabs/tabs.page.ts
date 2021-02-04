import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'stc-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  inventoryIcon: string;
  addInventoryIcon: string;
  settingsIcon: string;

  constructor(private navCtrl: NavController) {}

  changeTab({ tab }): void {
    this.inventoryIcon = tab === 'inventories' ? 'list-sharp' : 'list-outline';
    this.addInventoryIcon =
      tab === 'add-inventory' ? 'add-circle-sharp' : 'add-circle-outline';
    this.settingsIcon = tab === 'settings' ? 'settings' : 'settings-outline';
  }

  goToInventoryDetails(): void {
    this.navCtrl.navigateRoot(['tabs', 'add-inventory']);
  }
}
