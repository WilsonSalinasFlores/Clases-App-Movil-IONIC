import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class Tareas {
  
  private tareasSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public tareas$ = this.tareasSubject.asObservable();
  public tareas: Array<any> = [];
  constructor(private toastCtrl: ToastController) { 
    
    // cargar tareas desde el storage al crear el servicio
    this.cargarTareas();
  }
  async crearTarea(titulo:string, descripcion:string, fecha:string | null){
    await this.cargarTareas();
    let tarea={id:this.obtenerUltimoId()+1, titulo:titulo, descripcion:descripcion, fecha: fecha || null};
    this.tareas.push(tarea);
    await Preferences.set({
      key: 'tareas',
      value: JSON.stringify(this.tareas),
    });
    this.tareasSubject.next(this.tareas);

  }
  async obtenerTareas(){
    // devuelve un arreglo de tareas (vacío si no existe)
    await this.cargarTareas();
    return this.tareas;
  }
  async eliminarTarea(id:number){
    await this.cargarTareas();
    this.tareas=this.tareas.filter(tarea=>tarea.id!==id);
    await Preferences.set({
      key: 'tareas',
      value: JSON.stringify(this.tareas),
    });
    this.tareasSubject.next(this.tareas);
  }
  async  editarTarea(id:number, titulo:string, descripcion:string, fecha:string | null){
    await this.cargarTareas();
    this.tareas=this.tareas.map(tarea=>{
      if(tarea.id===id){
        return {id:id, titulo:titulo, descripcion:descripcion, fecha: fecha};
      }
      return tarea;
    });
    await Preferences.set({
      key: 'tareas',
      value: JSON.stringify(this.tareas),
    });
    this.tareasSubject.next(this.tareas);
  }
  obtenerTareaPorId(id:number){
    return this.tareas.find(tarea=>tarea.id===id);
  }
  obtenerUltimoId():number{
    let ultimoId=0;
    this.tareas.forEach(tarea=>{
      if(tarea.id>ultimoId){
        ultimoId=tarea.id;
      }
    });
    return ultimoId;
  }
  async mostrarToast(mensaje: string, tiempo: number) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: tiempo,
      position: 'top',
    });
    await toast.present();
  }

 
  async cargarTareas():Promise<any[]>{
    try{
      const res = await Preferences.get({key:'tareas'});
      if(res && res.value){
        this.tareas = JSON.parse(res.value);
      } else {
        this.tareas = [];
      }
    }catch(e){
      console.warn('Error cargando tareas desde Preferences', e);
      this.tareas = [];
    }
    this.tareasSubject.next(this.tareas);
    return this.tareas;
  }

}
