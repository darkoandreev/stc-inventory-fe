import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEditInventoryFacade } from '../../store/facade/create-edit-inventory.facade';
import { IInventory } from '../../store/models/inventory.model';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
})
export class InventoryFormComponent implements OnInit {
  @Output() submitInventory = new EventEmitter<IInventory>();
  inventoryForm: FormGroup;
  
  constructor(private formbuilder: FormBuilder,
              public facade: CreateEditInventoryFacade) {
    this.inventoryForm = this.formbuilder.group ({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      descriptiton: [''],
      amount: ['', Validators.required],
      quantity: [''],
      inventoryNumber: [''],
      buyedAt: [''],
      location: ['', Validators.required],
      responsiblePerson: ['', Validators.required],
      isValid: [true],
      isAmortization: [false],
      growth: [''],
      imageUrl: ['https://www.link.com/']
    });
   }

  ngOnInit() {
    this.facade.getCategories();
  }
}
