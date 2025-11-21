import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  
  numeros : Array<number> = [1,2,3,4,5,6,7,8,9,10];
  nombres : Array<string> = ["Fausto","Maria","Juan","Ana","Pedro","Luis","Carmen","Diego","Sofia","Miguel"];
  resultado: number = 0;
  constructor() { }

  mostrar(seleccion: number) {
    this.resultado = seleccion;
  }
}



