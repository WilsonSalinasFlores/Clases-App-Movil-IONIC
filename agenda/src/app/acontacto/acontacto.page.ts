import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Acceso } from '../servicio/acceso';

@Component({
  selector: 'app-acontacto',
  templateUrl: './acontacto.page.html',
  styleUrls: ['./acontacto.page.scss'],
  standalone: false,
})
export class AcontactoPage implements OnInit {
  cod_persona: string="";
  txtnombre: string="";
  txtapellido: string="";
  txttelefono: string="";
  txtemail: string="";
  cod_contacto: string="";
  constructor(public servicio: Acceso, public navCtrl: NavController) {
    this.servicio.obtenerSesion('idpersona').then((res:any)=>{
      this.cod_persona=res;
    });
    this.servicio.obtenerSesion('idcontacto').then((res:any)=>{
      this.cod_contacto=res;
      this.cargarDatos(this.cod_contacto);
    });
   }

  ngOnInit() {
  }
  cargarDatos(idcontacto: string){
    
    let datos = {
      accion: "consultarDato",
      cod_contacto: idcontacto
    }
    this.servicio.enviarDatos(datos,"contacto").subscribe(async (res:any)=>{
      if (res.estado){
        let contacto=res.contacto;
        this.txtnombre=contacto.nom_contacto;
        this.txtapellido=contacto.ape_contacto;
        this.txttelefono=contacto.telefono_contacto;
        this.txtemail=contacto.email_contacto;
      } else {
        await this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });
  }

  editar(){
    let datos={
      accion: 'actualizar',
      cod_contacto: this.cod_contacto,
      nombre: this.txtnombre,
      apellido: this.txtapellido,
      telefono: this.txttelefono,
      correo: this.txtemail
    }
    this.servicio.enviarDatos(datos,"contacto").subscribe(async (res:any)=>{
      if (res.estado){
        await this.servicio.mostrarToast(res.mensaje, 3000);
        this.navCtrl.back();
        await this.servicio.mostrarToast("Contacto actualizado", 3000);
      } else {
        await this.servicio.mostrarToast(res.mensaje, 3000);
      }
    });
  }
}
