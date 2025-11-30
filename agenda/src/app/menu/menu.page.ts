import { Component, OnInit } from '@angular/core';
import { Acceso } from '../servicio/acceso';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  id_persona:string="";
  datospersona: any;
  nombre :string="";
  constructor( public servicio: Acceso) { 
    this.servicio.obtenerSesion('idpersona').then((res:any)=>{
      this.id_persona=res;
      this.dpersona(this.id_persona);
    });
  }

  ngOnInit() {
  }
  dpersona(id: string){
    let datos={
      accion: 'consulta',
      cod_persona: id

    };
    this.servicio.enviarDatos(datos).subscribe(async (res:any)=>{
      if (res.estado){
        this.datospersona=res.persona;
        this.nombre=this.datospersona.nombre + ' ' + this.datospersona.apellido;
      }
    });
  }
}
