import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CreateEditInventoryFacade } from '../../store/facade/create-edit-inventory.facade';
import { IInventory } from '../../store/models/inventory.model';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryFormComponent implements OnInit {
  @Output() submitInventory = new EventEmitter<IInventory>();
  inventory$: Observable<IInventory>;
  id: string;
  inventoryForm: FormGroup;
  
  constructor(private formbuilder: FormBuilder,
              public facade: CreateEditInventoryFacade,
              private platform: Platform,
              private camera: Camera,
              private route: ActivatedRoute) {
                
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

    this.inventory$ = this.facade.inventory$;
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.facade.getInventory(this.id);
    }
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

  submit(): void {
    const inventory: IInventory = {
      ...this.inventoryForm.value,
      id: this.id
   }
    this.submitInventory.emit(inventory);
  }
}
