import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Acceso {
 server: string = 'http://192.168.100.7:8080/WSAGENDAcrud/datos/persona.php';
 server2: string = 'http://192.168.100.7:8080/WSAGENDAcrud/datos/contacto.php';

  constructor(
    private toastCtrl: ToastController,
    public http: HttpClient
  ) {
  
  }
  enviarDatos(cuerpo: any,tabla:string) {
    let url = tabla === "persona" ? this.server : this.server2;
    let head=new HttpHeaders({'Content-Type':'application/json , charset=UTF-8'});
    let opciones={
      headers: head
    };
    return this.http.post(url, cuerpo, opciones);
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
    await toast.present();
  }
  
}
