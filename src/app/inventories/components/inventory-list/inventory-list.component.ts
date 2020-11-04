import { Component, OnInit } from '@angular/core';
import { InventoriesFacade } from '../../store/facade/inventories.facade';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent implements OnInit {

  constructor(public facade: InventoriesFacade) { }

  ngOnInit() {}

}
