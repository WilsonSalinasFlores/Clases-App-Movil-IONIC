import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  txt_n1: string="" ;
  txt_n2: string="" ;
  txt_r:string = "";
  constructor() {}
  suma(){
    this.txt_r = (parseFloat(this.txt_n1)+ parseFloat(this.txt_n2)).toString();
  }
  resta(){
    this.txt_r = (parseFloat(this.txt_n1)- parseFloat(this.txt_n2)).toString();
  }
  multiplica(){
    this.txt_r = (parseFloat(this.txt_n1)* parseFloat(this.txt_n2)).toString();
  }
  divide(){
    this.txt_r = (parseFloat(this.txt_n1)/ parseFloat(this.txt_n2)).toString();
  }
}
