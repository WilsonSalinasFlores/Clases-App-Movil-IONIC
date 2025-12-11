import { Component, OnInit } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone: false,
})
export class CuentaPage implements OnInit {
  cod_persona: string="";
  txt_cedula: string="";
  txt_nombres: string="";
  txt_apellido: string="";
  txt_clave: string="";
  txt_telefono: string="";
  txt_correo: string="";
  txt_clave2: string="";
  mensaje: string="";
  bloqueado: boolean=true;
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
  guardar(){
    if (this.txt_cedula!="") {
      let datos = {
        accion: 'crear',
        cedula: this.txt_cedula,
        nombre: this.txt_nombres,
        apellido: this.txt_apellido,
        clave: this.txt_clave,
        telefono: this.txt_telefono,
        correo: this.txt_correo

      };
      this.servicio.enviarDatos(datos,"persona").subscribe(async (res:any)=>{
        if(res.estado){
          this.servicio.mostrarToast(res.mensaje, 3000);
          this.modalCtrl.dismiss();
        }else{
          this.servicio.mostrarToast(res.mensaje, 3000);
        }
      });
    }else 
    {
      this.servicio.mostrarToast("Faltan Datos", 3000);
    }
    
  }
  cancelar(){
    this.modalCtrl.dismiss();
  }
}