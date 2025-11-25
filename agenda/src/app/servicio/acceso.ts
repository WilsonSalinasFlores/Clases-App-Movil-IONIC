import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})
export class Acceso {
 server: string = 'http://localhost:8080/WsAgenda/Agenda.php';

  constructor(private toastCtrl: ToastController) {
  
  }
  async crearSesion(id: string, valor : string) {
    await Preferences.set({
      key: id,
      value: valor,
    });
  }
  async obtenerSesion(id: string) {
    const item = await Preferences.get({ key: id });
    return item.value;
  }
  async cerrarSesion() {
    await Preferences.clear();
  }
  async eliminarSesion(id: string) {
    await Preferences.remove({ key: id });
  }
  
  async mostrarToast(mensaje: string, tiempo: number) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: tiempo,
      position: 'top',
    });
    toast.present();
  }
  
}
