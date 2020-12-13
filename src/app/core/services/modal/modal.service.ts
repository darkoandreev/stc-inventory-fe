import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalController: ModalController) {}

  async presentModal(componentProps: any, component: any): Promise<any> {
    const modal = await this.modalController.create({
      component,
      componentProps,
    });
    await modal.present();

    return await modal.onDidDismiss();
  }
}
