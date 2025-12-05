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
  fecha:string| null = null;
  id: number=0;
  tarea: any = null;
  constructor(
    private servicio: Tareas,
    private router: Router
  ) { 
    this.id = this.getIdFromRoute();
  }
  async ngOnInit() {
    await this.servicio.obtenerTareas();
    const tarea = this.servicio.obtenerTareaPorId(this.id);
    if (tarea) {
      this.tarea = tarea;
      this.titulo = tarea.titulo;
      this.descripcion = tarea.descripcion;
      this.fecha = tarea.fecha || null;
    }
  }


  
  private getIdFromRoute(): number {
    const urlSegments = this.router.url.split('/');
    return Number(urlSegments[urlSegments.length - 1]);
  }

  formatFecha(fecha?: string | null): string {
    if (!fecha) return '—';
    const parts = fecha.split('-');
    if (parts.length !== 3) return fecha;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }


}
