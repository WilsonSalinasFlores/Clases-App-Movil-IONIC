import { Component } from '@angular/core';
import { Acceso } from '../servicio/acceso';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  usuarios:String='Juan';
  clave:String='123';
  constructor(public servicio: Acceso) {}

  ingreso(){
    this.servicio.crearSesion('nombre',this.usuarios.toString());
    this.servicio.crearSesion('pwd',this.clave.toString());
  }
  obtenerDatos(){
    this.servicio.obtenerSesion('nombre').then((res:any)=>{
      this.servicio.mostrarToast(`Usuario: ${res}`, 3000);
    });
  
  }
}
