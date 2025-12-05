import { Component, OnInit } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone: false,
})
export class CuentaPage implements OnInit {
  cod_persona: string="";
  txtcedula: string="";
  txtnombre: string="";
  txtapellido: string="";
  txtclave: string="";
  txttelefono: string="";
  txtemail: string="";
  txtrespuesta1: string="";
  txtrespuesta2: string="";
  txtrespuesta3: string="";
  cod_contacto: string="";
  
  constructor(public servicio: Acceso, public navCtrl: NavController) {
  
  
  }

  ngOnInit() {
  }

  guardar(){
    let datos={
      accion: 'insertar',
      cedula: this.txtcedula,
      nombre: this.txtnombre,
      apellido: this.txtapellido,
      clave: this.txtclave,
      correo: this.txtemail,
      respuesta1: this.txtrespuesta1,
      respuesta2: this.txtrespuesta2,
      respuesta3: this.txtrespuesta3
    };
    this.servicio.enviarDatos(datos,"persona").subscribe(async (res:any)=>{
      if (res.estado){
        await this.servicio.mostrarToast(res.mensaje, 3000);
        this.navCtrl.back();
      } else {
        await this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });
 }
}