import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IInventory } from '../../store/models/inventory.model';

@Component({
  selector: 'stc-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryListComponent {
  @Input() inventories: IInventory[];
  @Output() viewInventory = new EventEmitter<IInventory>();
  @Output() infiniteScroll = new EventEmitter<any>();

  constructor(public modalController: ModalController) {}
}
