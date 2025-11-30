import { Component, OnInit } from '@angular/core';
import { Tareas } from 'src/app/servicio/tareas';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  standalone: false,
})
export class CrearTareaPage implements OnInit {
  descripcion:string="";
  titulo:string="";
  constructor(
    private servicio:Tareas
  ) { 

    
  }
  guardarTarea(){
    this.servicio.crearTarea(this.titulo, this.descripcion).then(()=>{
      this.servicio.mostrarToast('Tarea creada', 2000);
      this.titulo = '';
      this.descripcion = '';
      window.history.back();
      setTimeout(() => {
        try { window.location.reload(); } catch (e) { /* ignore */ }
      }, 200);
    });
    
  }

  ngOnInit() {
  }

}
