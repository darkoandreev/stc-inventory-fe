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
  inventoryForm: FormGroup;
  inventoryImageUrl: string;
  previousYear: number = new Date().getFullYear() - 1;

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
  @Output() imageChange = new EventEmitter<{
    imageBlob: Blob;
    imageName: string;
  }>();

  private _inventory: IInventory;

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
      cssClass: 'stc-action-sheet',
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

  private async captureInventory(source: CameraSource): Promise<void> {
    if (!this.platform.is('cordova')) {
      return;
    }
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source,
      quality: 50,
    });

    const imageBlob = b64toBlob(
      capturedPhoto.base64String,
      `image/${capturedPhoto.format}`
    );

    this.inventoryImageUrl = `data:image/jpeg;base64, ${capturedPhoto.base64String}`;
    const imageName = `${new Date().getTime()}_inventory_image.${
      capturedPhoto.format
    }`;
    this.inventoryForm.get('imageName').setValue(imageName);
    this.cdr.markForCheck();

    this.imageChange.emit({ imageBlob, imageName });
  }

  private initForm(): void {
    this.inventoryForm = this.formbuilder.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      inventoryNumber: ['', Validators.required],
      location: ['', Validators.required],
      responsiblePerson: ['', Validators.required],
      imageName: ['test', Validators.required],
      quantity: 1,
      lastYearWriteOffAmount: '',
      description: null,
      buyDate: new Date(),
      isValid: true,
      isAmortization: false,
      growth: null,
    });
  }
}

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
