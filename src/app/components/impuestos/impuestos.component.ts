import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Datos } from '../../models/datos.models';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrl: './impuestos.component.css'
})
export class ImpuestosComponent implements OnInit{
  formulario: FormGroup;
  constructor(private fb: FormBuilder) 
  {
    this.formulario = this.fb.group({
      ruc: ['', Validators.required],
      sueldo: ['', Validators.required],
      alimentos: ['', Validators.required],
      vivienda: ['', Validators.required],
      educacion: ['', Validators.required],
      vestimenta: ['', Validators.required],
      salud: ['', Validators.required]
    });
  }

  onSubmit()
  {
    if(this.formulario.valid)
    {
      let datos = new Datos(this.formulario.value.ruc, this.formulario.value.sueldo, 
        (this.formulario.value.alimentos+this.formulario.value.vivienda+this.formulario.value.educacion
        +this.formulario.value.vestimenta+this.formulario.value.salud)
      );
      console.log(datos);
    }
  }

  ngOnInit():void{
  }  
}
