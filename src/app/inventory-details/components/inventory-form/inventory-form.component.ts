import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform, ActionSheetController } from '@ionic/angular';
import { IInventory } from 'src/app/inventories/store/models/inventory.model';
import { ICategory } from '../../../inventories/store/models/category.model';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'stc-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryFormComponent {
  private _inventory: IInventory;

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

  constructor(
    private formbuilder: FormBuilder,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private actionSheetController: ActionSheetController
  ) {
    this.initForm();
  }

  submit(): void {
    const inventory: IInventory = {
      ...this.inventoryForm.value,
      id: this.inventoryId,
    };

    if (!this.inventoryId) {
      delete inventory.id;
    }
    this.submitInventory.emit(inventory);
  }

  async openCameraOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opcije',
      buttons: [
        {
          text: 'Album',
          icon: 'image',
          handler: async () => await this.captureInventory(CameraSource.Photos),
        },
        {
          text: 'Kamera',
          icon: 'camera',
          handler: async () => await this.captureInventory(CameraSource.Camera),
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  private async captureInventory(source: CameraSource) {
    if (!this.platform.is('cordova')) {
      return;
    }
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source,
      quality: 100,
    });

    this.inventoryForm.get('imageName').setValue(capturedPhoto.webPath);
    this.cdr.markForCheck();
  }

  private initForm(): void {
    this.inventoryForm = this.formbuilder.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      inventoryNumber: ['', Validators.required],
      location: ['', Validators.required],
      responsiblePerson: ['', Validators.required],
      imageName: ['', Validators.required],
      quantity: null,
      description: null,
      buyDate: new Date(),
      isValid: true,
      isAmortization: false,
      growth: null,
    });
  }
}
