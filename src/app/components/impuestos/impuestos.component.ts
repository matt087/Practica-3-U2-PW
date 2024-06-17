import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrl: './impuestos.component.css'
})
export class ImpuestosComponent implements OnInit{
  constructor(){}
  datosFormulario: any = {};

  ngOnInit():void{
  }
  guardarDatos(formulario: any) {
    this.datosFormulario = {
      cedula: formulario.value.cedula,
        sueldo: formulario.value.sueldo,
        alimentos: formulario.value.alimentos,
        vivienda: formulario.value.vivienda,
        educacion: formulario.value.educacion,
        vestimenta: formulario.value.vestimenta, 
        salud: formulario.value.salud
    };
    console.log('Datos guardados:', this.datosFormulario);
  }

  
}
