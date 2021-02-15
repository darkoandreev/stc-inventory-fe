import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  async presentLoading(id: string): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      id,
    });
    await loading.present();
  }

  async hideLoading(id: string): Promise<void> {
    this.loadingController.dismiss(null, null, id);
  }
}
