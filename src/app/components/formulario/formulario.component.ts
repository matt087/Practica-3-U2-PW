import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  constructor() {}
  ngOnInit():void
  {}
  ruc:string = '';
  valor:number=0.0;
  gasto:string=''; 
}

