import { Component, OnInit } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: false,
})
export class RecuperarPage implements OnInit {

  txtcedula: string="";
  txtrespuesta1: string="";
  txtrespuesta2: string="";
  txtrespuesta3: string="";
  claveOculta: string = "true";
  txtclave: string = "";
  constructor(public servicio: Acceso, public navCtrl: NavController) { 
    this.claveOculta = "true";
  }

  ngOnInit() {
  }
  recuperar(){
    let datos={
      accion: 'valida_preguntas',
      cedula: this.txtcedula, 
      respuesta1: this.txtrespuesta1,
      respuesta2: this.txtrespuesta2,
      respuesta3: this.txtrespuesta3
    }
    this.servicio.enviarDatos(datos,"persona").subscribe(async (res:any)=>{
      if (res.estado){
        this.txtclave = res.clave;
        this.claveOculta = "false";
      } else {
        
        this.claveOculta = "true";
        await this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });     
  }

}
