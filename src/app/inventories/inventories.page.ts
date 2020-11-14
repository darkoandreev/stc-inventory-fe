import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEditInventoryFacade } from '../tab2/store/facade/create-edit-inventory.facade';
import { ICategory } from '../tab2/store/models/category.model';
import { InventoriesFacade } from './store/facade/inventories.facade';

@Component({
  selector: 'app-inventories',
  templateUrl: 'inventories.page.html',
  styleUrls: ['inventories.page.scss']
})
export class InventoriesPage implements OnInit {
  inventoriesForm: FormGroup;
  selectedCategory: ICategory;
  selectedIsAmortization: boolean;

  constructor(private formBuilder: FormBuilder,
              public facadeInventories: InventoriesFacade,
              public facade: CreateEditInventoryFacade) {
    this.inventoriesForm = this.formBuilder.group ({
      categoryId: ['', Validators.required],
      isAmortization: [false]
    });
  }

  ngOnInit(): void {
    this.facade.getCategories();
    this.facadeInventories.getInventories();
  }

  getInventories(event: any, type: string) {
    if (type === 'checkbox') {
      this.selectedIsAmortization = event.detail.checked;
    }
    this.facadeInventories.getInventories('123', this.selectedIsAmortization);
  }

  searchInventory(event: CustomEvent): void {
    this.facadeInventories.searchInventories(event.detail.value, this.inventoriesForm.get('categoryId').value, this.inventoriesForm.get('isAmortization').value);
  }
}
