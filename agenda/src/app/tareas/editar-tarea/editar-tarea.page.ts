import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Acceso } from 'src/app/servicio/acceso';
import { Tareas } from 'src/app/servicio/tareas';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.page.html',
  styleUrls: ['./editar-tarea.page.scss'],
  standalone: false,
})
export class EditarTareaPage implements OnInit {
  titulo:string="";
  descripcion:string="";
  id : number=0;
  constructor(
    private servicio: Tareas,
    private router: Router    
  ) { 
    this.id = this.getIdFromRoute();
    this.obtenerTareaPorId(this.id);
  }


  private getIdFromRoute(): number {
    const urlSegments = this.router.url.split('/');
    return Number(urlSegments[urlSegments.length - 1]);
  }

  ngOnInit() {
  }
  editarTarea(){
      this.servicio.editarTarea(this.id, this.titulo, this.descripcion).then(()=>{
      this.servicio.mostrarToast('Tarea creada', 2000);
      this.titulo = '';
      this.descripcion = '';
      window.history.back();
      setTimeout(() => {
        try { window.location.reload(); } catch (e) { }
      }, 200);
    });
 
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
}
