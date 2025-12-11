import { Component, OnInit } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: false,
})
export class RecuperarPage implements OnInit {

  txt_cedula: string="";
  txt_correo: string="";
  txtrespuesta1: string="";
  txtrespuesta2: string="";
  txtrespuesta3: string="";
  txt_clave2: string="";  
  txt_clave: string = "";
  bloqueado: boolean=true;
  mensaje: string="";
  constructor(public servicio: Acceso, public modalCtrl: ModalController) { 
  }

  ngOnInit() {
  }
  vCedula(){
    let datos = {
      accion: 'vcedula',
      cedula: this.txt_cedula
    };
    this.servicio.enviarDatos(datos,"persona").subscribe(async (res:any)=>{
      if(res.estado){
        this.txt_cedula="";
        this.servicio.mostrarToast(res.mensaje, 3000);
        this.bloqueado=true;
      }else{
        this.bloqueado=false;
      }
        
      
    });
  }
  vClave(){
    if(this.txt_clave == this.txt_clave2){
      this.mensaje="";
      this.bloqueado=false;
    }else{
      this.mensaje="Las claves no coinciden";
      this.bloqueado=true;
    }
  }
  cambiarClave(){
    if (this.txt_cedula=="" || this.txt_correo=="" || this.txt_clave=="" || this.txt_clave2=="") {
      this.servicio.mostrarToast("Faltan datos por completar", 3000);
      return;  
    }
    if (this.txt_clave!=this.txt_clave2) {
      this.servicio.mostrarToast("Las claves no coinciden", 3000);
      return;
    }
    let datos = {
      accion: 'cclave',
      cedula: this.txt_cedula,
      correo: this.txt_correo,
      clave: this.txt_clave
    };
    this.servicio.enviarDatos(datos,"persona").subscribe(async (res:any)=>{
      if(res.estado){
        this.servicio.mostrarToast(res.mensaje, 3000);
        this.modalCtrl.dismiss();
      }else{
        this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });

  }

  cancelar(){
    this.modalCtrl.dismiss();
  }
}
