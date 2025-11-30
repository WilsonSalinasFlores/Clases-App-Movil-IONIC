import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: 'baja' | 'media' | 'alta';
  fechaLimite?: string;
  fechaCreacion: Date;
  completada: boolean;
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  tareas: Tarea[] = [];
  proximoId = 1;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    // Cargar algunas tareas de ejemplo
    this.tareas = [
      {
        id: this.proximoId++,
        titulo: 'Comprar víveres',
        descripcion: 'Leche, pan y frutas',
        prioridad: 'media',
        fechaLimite: '2025-12-05',
        fechaCreacion: new Date(),
        completada: false,
      },
      {
        id: this.proximoId++,
        titulo: 'Enviar informe',
        descripcion: 'Enviar informe semanal al equipo',
        prioridad: 'alta',
        fechaLimite: '2025-12-02',
        fechaCreacion: new Date(),
        completada: false,
      },
    ];
  }

  // Crear nueva tarea (usa prompt simple)
  async abrirCrearTarea() {
    const titulo = prompt('Título de la tarea:');
    if (!titulo) return;
    const descripcion = prompt('Descripción:') || '';
    const prioridad = prompt('Prioridad (baja, media, alta):', 'media') || 'media';
    const fechaLimite = prompt('Fecha límite (YYYY-MM-DD) (opcional):', '');

    const nueva: Tarea = {
      id: this.proximoId++,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      prioridad: (['baja', 'media', 'alta'].includes(prioridad) ? (prioridad as any) : 'media'),
      fechaLimite: fechaLimite ? fechaLimite : undefined,
      fechaCreacion: new Date(),
      completada: false,
    };
    this.tareas.unshift(nueva);
  }

  // Editar tarea (evitar propagar click)
  async editarTarea(ev: Event, tarea: Tarea) {
    ev.stopPropagation();
    const titulo = prompt('Editar título:', tarea.titulo);
    if (!titulo) return;
    const descripcion = prompt('Editar descripción:', tarea.descripcion) || '';
    const prioridad = prompt('Prioridad (baja, media, alta):', tarea.prioridad) || tarea.prioridad;
    const fechaLimite = prompt('Fecha límite (YYYY-MM-DD) (opcional):', tarea.fechaLimite || '');

    tarea.titulo = titulo.trim();
    tarea.descripcion = descripcion.trim();
    tarea.prioridad = (['baja', 'media', 'alta'].includes(prioridad) ? (prioridad as any) : tarea.prioridad);
    tarea.fechaLimite = fechaLimite ? fechaLimite : undefined;
  }

  // Eliminar tarea
  eliminarTarea(ev: Event | null, id: number) {
    if (ev) ev.stopPropagation();
    if (confirm('¿Eliminar esta tarea?')) {
      this.tareas = this.tareas.filter(t => t.id !== id);
    }
  }

  // Ver detalle (muestra un alert con la información)
  async verDetalle(tarea: Tarea) {
    const alert = await this.alertCtrl.create({
      header: tarea.titulo,
      subHeader: `Prioridad: ${tarea.prioridad}`,
      message: `<p>${tarea.descripcion}</p><p>Fecha límite: ${tarea.fechaLimite || '—'}</p><p>Creada: ${tarea.fechaCreacion.toLocaleString()}</p>`,
      buttons: [
        {
          text: tarea.completada ? 'Marcar como pendiente' : 'Marcar completada',
          handler: () => {
            tarea.completada = !tarea.completada;
          }
        },
        { text: 'Cerrar', role: 'cancel' }
      ]
    });
    await alert.present();
  }

  // Color para badge según prioridad
  badgeColor(prio: string) {
    return prio === 'alta' ? 'danger' : prio === 'media' ? 'warning' : 'success';
  }
}
