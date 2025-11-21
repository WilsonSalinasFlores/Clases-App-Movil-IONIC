import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isModalOpen: boolean = false;
  constructor() {}
  abrirModal(isOpen: boolean) {
     this.isModalOpen=isOpen;
  }
  
}
