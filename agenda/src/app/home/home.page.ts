import { Component } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  txt_usu:String="1203995392";
  txt_cla:String="123456";
  constructor(public servicio: Acceso, private navCtrl: NavController) {}

  login(){
    let datos={
      accion: 'login',
      usuario: this.txt_usu,
      clave: this.txt_cla
    };
    this.servicio.enviarDatos(datos).subscribe(async (res:any)=>{
      if(res.estado){
        this.servicio.crearSesion('idpersona', res.codigo);
        this.navCtrl.navigateRoot(['/menu']);
      }
      else{
        await this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });
  }

  crear(){
  }
    recuperar(){
  }
}
