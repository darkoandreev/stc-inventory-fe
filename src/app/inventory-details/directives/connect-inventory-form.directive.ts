import { Directive, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { IInventory } from 'src/app/inventories/store/models/inventory.model';

@Directive({ selector: '[connectInventoryForm]' })
export class ConnectInventoryFormDirective {
  @Input('connectInventoryForm')
  set inventory(val: IInventory) {
    if (val) {
      this.formGroupDirective.form.patchValue(val);
      this.formGroupDirective.form.markAsPristine();
    }
  }
  constructor(private formGroupDirective: FormGroupDirective) {}
}