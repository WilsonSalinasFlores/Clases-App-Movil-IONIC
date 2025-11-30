import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tareas } from 'src/app/servicio/tareas';

@Component({
  selector: 'app-ver-tarea',
  templateUrl: './ver-tarea.page.html',
  styleUrls: ['./ver-tarea.page.scss'],
  standalone: false,
})
export class VerTareaPage implements OnInit {
  titulo:string="";
  descripcion:string="";
  id: number=0;
  constructor(
    private servicio: Tareas,
    private router: Router
  ) { 
    this.id = this.getIdFromRoute();
    
    this.obtenerTareaPorId(this.id);
  }

  ngOnInit() {
  }
  obtenerTareaPorId(id: number){
    this.servicio.obtenerTareas().then((data:any)=>{
      if(data){
        const tareas = JSON.parse(data);
        const tarea = tareas.find((t:any) => t.id == id);
        if(tarea){
          this.titulo = tarea.titulo;
          this.descripcion = tarea.descripcion;
        }
      }
    });
  }
  private getIdFromRoute(): number {
    const urlSegments = this.router.url.split('/');
    return Number(urlSegments[urlSegments.length - 1]);
  }


}
