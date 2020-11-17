import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { InventoriesFacade } from 'src/app/inventories/store/facade/inventories.facade';
import { IInventory } from 'src/app/inventories/store/models/inventory.model';
import { ICategory } from '../../../inventories/store/models/category.model';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryFormComponent {
  _inventory: IInventory;

  inventoryForm: FormGroup;

  @Input()
  get inventory(): IInventory {
    return this._inventory;
  }
  set inventory(value: IInventory) {
    if (value) {
      this.inventoryForm.patchValue(value);
      this._inventory = value;
    }
  }

  @Input() categories: ICategory[];
  @Input() inventoryId: string;

  @Output() submitInventory = new EventEmitter<IInventory>();


  constructor(private formbuilder: FormBuilder,
              private platform: Platform,
              private camera: Camera) {
    this.initForm();
   }

  captureInventory(): void {
    if (!this.platform.is('cordova')) {
      return;
    }
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options).then((x) => alert(x));
  }

  submit(): void {
    const inventory: IInventory = {
      ...this.inventoryForm.value,
      id: this.inventoryId
    };

    if (!this.inventoryId) {
      delete inventory.id;
    }
    this.submitInventory.emit(inventory);
  }

  initForm(): void {
    this.inventoryForm = this.formbuilder.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      inventoryNumber: ['', Validators.required],
      location: ['', Validators.required],
      responsiblePerson: ['', Validators.required],
      quantity: null,
      description: null,
      buyDate: new Date(),
      isValid: true,
      isAmortization: false,
      growth: null,
      imageUrl: ['https://www.link.com/']
    });
  }
}
