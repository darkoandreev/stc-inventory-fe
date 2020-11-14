import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { CreateEditInventoryFacade } from '../../store/facade/create-edit-inventory.facade';
import { IInventory } from '../../store/models/inventory.model';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryFormComponent implements OnInit {
  #inventory: IInventory;

  @Input()
  get inventory(): IInventory {
    return this.#inventory;
  }
  set inventory(inventory: IInventory) {
    this.#inventory = inventory;
    this.inventoryForm.patchValue(inventory);
  }

  @Output() submitInventory = new EventEmitter<IInventory>();

  inventoryForm: FormGroup;
  
  constructor(private formbuilder: FormBuilder,
              public facade: CreateEditInventoryFacade,
              private platform: Platform,
              private camera: Camera) {
                
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

  ngOnInit() {
    this.facade.getCategories();
  }

  captureInventory(): void {
    if(!this.platform.is('cordova')) {
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
}
