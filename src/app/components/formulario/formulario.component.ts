import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gasto } from '../../models/gasto.model';
import { JsonFileService } from '../../services/json-file.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  dataArray: any[] = []; // Inicializado como un array vacío
  formulario: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private jsonFileService: JsonFileService) 
  {
    this.formulario = this.fb.group({
      ruc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^\d{13}$/)]],
      valor: [0, [Validators.required, Validators.min(0)]],
      gasto: ['', [Validators.required]]
    });
  }
  
  onSubmit()
  {
    if(this.formulario.valid)
      {
        let gasto = new Gasto(this.formulario.value.ruc, this.formulario.value.valor, this.formulario.value.gasto);
        console.log(gasto);
        const datosArray = this.generateJsonArray([gasto]);
        this.dataArray.push(...datosArray); // Asegurarse de que datosArray sea un arreglo de objetos
        this.saveData();
        alert('Ingreso correcto!');
      } else {
        alert('Formulario inválido, por favor revise los campos.');
      }
  }
  ngOnInit():void
  {}

  loadJson() {
    this.http.get<any[]>('../../../assets/datos.json').subscribe(
      data => {
        this.dataArray = data || []; // Asegurarse de que dataArray esté inicializado
        console.log(this.dataArray);
      },
      error => {
        console.error('Error al cargar los datos', error);
        this.dataArray = []; // Inicializar en caso de error
      }
    );
  }
  
  saveData() {
    this.jsonFileService.saveInfoData(this.dataArray).subscribe(response => {
      console.log('Datos guardados con éxito', response);
    }, error => {
      console.error('Error al guardar los datos', error);
    });
  }
  
  generateJsonArray(records: Gasto[]): object[] {
    return records.map(record => record.toJson());
  }
  
 
}

