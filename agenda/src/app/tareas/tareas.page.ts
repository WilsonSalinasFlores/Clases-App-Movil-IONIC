import { Component, OnInit } from '@angular/core';
import { Tareas } from '../servicio/tareas';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: false,
})
export class TareasPage implements OnInit {
  tareas:any[]=[];
  constructor( 
    private servicio:Tareas,
    private router: Router
  ) { 
    
    this.obtenberTareas(); 
    
  }
  obtenberTareas(){
    this.servicio.obtenerTareas().then((data:any)=>{
      if(data){
        this.tareas=JSON.parse(data);
      } 
    });
  }
  editarTarea(id:number){
    
    this.router.navigate(['/editar-tarea', id]);
  }
  eliminarTarea(id:number){
    this.servicio.eliminarTarea(id).then(()=>{
      this.obtenberTareas();
    });
  }
  ngOnInit() {
    this.obtenberTareas();
  }

}
