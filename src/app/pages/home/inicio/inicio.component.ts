import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  isToast: boolean = false;
  isToast1: boolean = false;

  _toasts: Array<any> = [
    {title: 'hola', message: 'Hola mundo', data: new Date(), isShow: true}
  ];

  get toasts(){
    return this._toasts.filter(f => f.isShow);
  }

  constructor() { }

  ngOnInit(): void {
  }

  reset(){
    this._toasts.forEach(f => {
      f.isShow = true;
    })
  }

}
