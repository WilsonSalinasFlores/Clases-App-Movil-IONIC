import { Component, OnInit } from '@angular/core';
import { Acceso } from '../servicio/acceso';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  cod_persona:String="";
  constructor( public servicio: Acceso) { 
    this.servicio.obtenerSesion('idpersona').then((res:any)=>{
      this.cod_persona=res;
    });
  }

  ngOnInit() {
  }

}
