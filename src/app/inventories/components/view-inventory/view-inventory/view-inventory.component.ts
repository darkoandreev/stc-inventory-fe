import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { IInventory } from 'src/app/tab2/store/models/inventory.model';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss'],
})
export class ViewInventoryComponent implements OnInit {
  inventory: IInventory;
  @Output() closeModal = new EventEmitter<any>();

  constructor(public navParams: NavParams,
              public modalController: ModalController,
              private router: Router) { 
    this.inventory = this.navParams.get('inventory') 
  }

  ngOnInit() {}

  deleteInventory() {}

  editInventory() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/tabs/add-inventory');
  }

}
