import { Component, OnInit } from '@angular/core';
import { Tareas } from 'src/app/servicio/tareas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  standalone: false,
})
export class CrearTareaPage implements OnInit {
  descripcion:string="";
  titulo:string="";
  fecha:string | null = null;
  constructor(
    private servicio:Tareas
    , private router: Router
  ) { 

    
  }
  async guardarTarea(){
    const titulo = (this.titulo || '').trim();
    if(!titulo){
      await this.servicio.mostrarToast('El título es obligatorio', 2000);
      return;
    }

    const fechaNorm = this.normalizeDate(this.fecha);
    if(this.fecha && !fechaNorm){
      await this.servicio.mostrarToast('Fecha inválida', 2000);
      return;
    }
    if(fechaNorm){
      const today = new Date();
      today.setHours(0,0,0,0);
      const f = new Date(fechaNorm);
      if(f < today){
        await this.servicio.mostrarToast('La fecha no puede ser anterior a hoy', 2000);
        return;
      }
    }

    await this.servicio.crearTarea(titulo, this.descripcion, fechaNorm );
    await this.servicio.mostrarToast('Tarea creada', 2000);
    this.titulo = '';
    this.descripcion = '';
    this.fecha = null;
    await this.router.navigate(['/tareas']);
  }
  cancelar(){
    this.titulo = '';
    this.descripcion = '';
    this.fecha = null;
    this.router.navigate(['/tareas']);
  }
  private normalizeDate(fecha?: string | null): string | null {
    if(!fecha) return null;
    const d = new Date(fecha);
    if(isNaN(d.getTime())) return null;
    return d.toISOString().split('T')[0];
  }

  ngOnInit() {
  }

}
