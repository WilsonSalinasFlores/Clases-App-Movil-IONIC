import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tareas } from '../servicio/tareas';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: false,
})
export class TareasPage implements OnInit, OnDestroy {
  tareas: any[] = [];
  private sub!: Subscription;

  constructor(
    private servicio: Tareas,
    private router: Router
  ) {}
  editarTarea(id:number){
    this.router.navigate(['/editar-tarea', id]);
  }
  verDetalle(id:number){
    this.router.navigate(['/ver-tarea', id]);
  }
  eliminarTarea(id:number){
    this.servicio.eliminarTarea(id).then(()=>{
  
    });
  }
  ngOnInit() {
  
    this.sub = this.servicio.tareas$.subscribe((t: any[]) => {
      this.tareas = Array.isArray(t) ? t : [];
    });
  }

  
  ionViewWillEnter() {
  
    this.servicio.cargarTareas?.();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  formatFecha(fecha?: string | null): string {
    if (!fecha) return '—';
    // esperar formato YYYY-MM-DD
    const parts = fecha.split('-');
    if (parts.length !== 3) return fecha;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

}
