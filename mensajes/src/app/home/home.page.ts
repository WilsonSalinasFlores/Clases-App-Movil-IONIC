import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pagina2Page } from '../pagina2/pagina2.page';
import { ToastController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isModalOpen: boolean = false;
  constructor(
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {}
  abrirModal(isOpen: boolean) {
     this.isModalOpen=isOpen;
  }
  
  async llamarModal(){
    const modal = await this.modalCtrl.create({
      component: Pagina2Page
    });
    return await modal.present();  
  }

  async mostrarToast(message: string, tiempo: number){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: tiempo,
      position: 'top'
    });
    return await toast.present();
  }

}
