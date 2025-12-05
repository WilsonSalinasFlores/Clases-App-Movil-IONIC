import { Component, OnInit } from '@angular/core';
import { Acceso } from '../servicio/acceso';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: false,
})
export class ContactoPage implements OnInit {
  cod_persona: string="";
  txtnombre: string="";
  txtapellido: string="";
  txttelefono: string="";
  txtemail: string="";
  constructor(private servicio: Acceso, private navCtrl: NavController) {
    this.servicio.obtenerSesion('idpersona').then((res:any)=>{
      this.cod_persona=res;
    });
  }

  ngOnInit() {
  }

  guardar(){
    let datos={
      accion: 'insertar',
      cod_persona: this.cod_persona,
      nombre: this.txtnombre,
      apellido: this.txtapellido,
      telefono: this.txttelefono,
      email: this.txtemail
    }
    this.servicio.enviarDatos(datos,"contacto").subscribe(async (res:any)=>{
      if (res.estado){
        await this.servicio.mostrarToast(res.mensaje, 3000);
        this.navCtrl.back();
      } else {
        await this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });
  }
}
