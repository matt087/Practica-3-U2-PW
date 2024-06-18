import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Datos } from '../../models/datos.models';
import { JsonFileService } from '../../json-file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrl: './impuestos.component.css'
})
export class ImpuestosComponent implements OnInit{
  dataArray: any[] = []; 
    formulario: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private jsonFileService: JsonFileService) 
  {
    this.formulario = this.fb.group({
      ruc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^\d{13}$/)]],
      sueldo: [1, [Validators.required, Validators.min(1)]],
      alimentos:[0, [Validators.required, Validators.min(0), Validators.max(3809.65)]],
      vivienda: [0, [Validators.required, Validators.min(0), Validators.max(3809.65)]],
      educacion: [0, [Validators.required, Validators.min(0), Validators.max(3809.65)]],
      vestimenta: [0, [Validators.required, Validators.min(0), Validators.max(3809.65)]],
      salud: [0, [Validators.required, Validators.min(0), Validators.max(3809.65)]]
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
      alert('Impuesto a la renta calculado correctamente');
      console.log(datos);
      const datosArray = [datos];
      const jsonArray = this.generateJsonArray(datosArray);
      const jsonString = JSON.stringify(jsonArray, null, 2);
      this.dataArray.push(jsonString);
      this.saveData();
    }
  }

  ngOnInit():void{
    this.loadJson();
  }  

  loadJson() {
    this.http.get<any[]>('../../../assets/data.json').subscribe(data => {
      this.dataArray = data;
      console.log(this.dataArray);
    });
  }

  saveData() {
    this.jsonFileService.saveJsonData(this.dataArray).subscribe(response => {
      console.log('Datos guardados con éxito', response);
    }, error => {
      console.error('Error al guardar los datos', error);
    });
  }

   generateJsonArray(records: Datos[]): object[] {
    return records.map(record => record.toJson());
  }
  
}
