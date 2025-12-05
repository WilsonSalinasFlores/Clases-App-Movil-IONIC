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
  fecha: string | null = null;
  
  constructor(
    private servicio: Tareas,
    private router: Router    
  ) { 
    this.id = this.getIdFromRoute();
  }


  private getIdFromRoute(): number {
    const urlSegments = this.router.url.split('/');
    return Number(urlSegments[urlSegments.length - 1]);
  }

  async ngOnInit() {
    await this.servicio.obtenerTareas();
    const tarea = this.servicio.obtenerTareaPorId(this.id);
    if (tarea) {
      this.titulo = tarea.titulo;
      this.descripcion = tarea.descripcion;
      this.fecha = tarea.fecha || null;
    }
  }
  editarTarea(){
      (async () => {
        const titulo = (this.titulo || '').trim();
        if(!titulo){
          await this.servicio.mostrarToast('El título es obligatorio', 2000);
          return;
        }
        const fechaNorm = this.formatoFecha(this.fecha);
        if(this.fecha && !fechaNorm){
          await this.servicio.mostrarToast('Fecha inválida', 2000);
          return;
        }
        if(fechaNorm){
          const today = new Date(); today.setHours(0,0,0,0);
          const f = new Date(fechaNorm);
          if(f < today){
            await this.servicio.mostrarToast('La fecha no puede ser anterior a hoy', 2000);
            return;
          }
        }

        await this.servicio.editarTarea(this.id, this.titulo, this.descripcion, fechaNorm);
        await this.servicio.mostrarToast('Tarea actualizada', 2000);
        this.titulo = '';
        this.descripcion = '';
        this.fecha = null;
        await this.router.navigate(['/tareas']);
      })();
 
  }
  obtenerTareaPorId(id: number){
    // kept for compatibility but prefer ngOnInit flow
    this.servicio.obtenerTareas().then((data:any)=>{
      if(data && Array.isArray(data)){
        const tarea = data.find((t:any) => t.id == id);
        if(tarea){
          this.titulo = tarea.titulo;
          this.descripcion = tarea.descripcion;
          this.fecha = tarea.fecha || null;
        }
      }
    });
  }

  cancelar(){
    this.titulo = '';
    this.descripcion = '';
    this.fecha = null;
    this.router.navigate(['/tareas']);
  }
  private formatoFecha(fecha?: string | null): string | null {
    if(!fecha) return null;
    const d = new Date(fecha);
    if(isNaN(d.getTime())) return null;
    return d.toISOString().split('T')[0];
  }

  formatFecha(fecha?: string | null): string {
    if (!fecha) return '—';
    const parts = fecha.split('-');
    if (parts.length !== 3) return fecha;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
}
