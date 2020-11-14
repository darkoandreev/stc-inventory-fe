import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { IInventory } from 'src/app/tab2/store/models/inventory.model';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss'],
})
export class ViewInventoryComponent implements OnInit {
  inventory: IInventory;

  constructor(public navParams: NavParams) { 
    this.inventory = this.navParams.get('inventory') 
  }

  ngOnInit() {}

}
