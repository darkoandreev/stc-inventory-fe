import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IInventory } from '../../store/models/inventory.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryListComponent {
  @Input() inventories: IInventory[];
  @Output() viewInventory = new EventEmitter<IInventory>();
  
  constructor(public modalController: ModalController){}
}
