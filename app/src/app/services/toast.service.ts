import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}


  async presentToast(position: 'top' | 'middle' | 'bottom', content: string, duration:number, color: 'success' | 'warning' | 'danger', icon:string) {
    const toast = await this.toastController.create({
      message: content,
      duration: duration,
      position: position,
      color: color,
      icon: icon
    });

    await toast.present();
  }
}
