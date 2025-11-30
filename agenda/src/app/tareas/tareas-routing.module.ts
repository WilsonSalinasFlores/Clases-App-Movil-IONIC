import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasPage } from './tareas.page';

const routes: Routes = [
  {
    path: '',
    component: TareasPage
  },  {
    path: 'crear-tarea',
    loadChildren: () => import('./crear-tarea/crear-tarea.module').then( m => m.CrearTareaPageModule)
  },
  {
    path: 'editar-tarea',
    loadChildren: () => import('./editar-tarea/editar-tarea.module').then( m => m.EditarTareaPageModule)
  },
  {
    path: 'ver-tarea',
    loadChildren: () => import('./ver-tarea/ver-tarea.module').then( m => m.VerTareaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasPageRoutingModule {}
