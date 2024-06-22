import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Datos } from '../../models/datos.model';
import { JsonFileService } from '../../services/json-file.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrl: './impuestos.component.css'
})
export class ImpuestosComponent implements OnInit{
  dataArray: any[] = []; // Inicializado como un array vacío
  formulario: FormGroup;
  impuesto: number = 0;
  constructor(private fb: FormBuilder, private http: HttpClient, private jsonFileService: JsonFileService) 
  {
    this.formulario = this.fb.group({
      ruc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^\d{13}$/)]],
      sueldo: [1, [Validators.required, Validators.min(1)]],
      alimentos:[0, [Validators.required, Validators.min(0), Validators.max(3809.65)]],
      vivienda: [0, [Validators.required, Validators.min(0), Validators.max(3809.65)]],
      educacion: [0, [Validators.required, Validators.min(0), Validators.max(3809.65)]],
      vestimenta: [0, [Validators.required, Validators.min(0), Validators.max(3809.65)]],
      salud: [0, [Validators.required, Validators.min(0), Validators.max(15238.6)]]
    },{validators: sumValidator()});
  }

  onSubmit() {
    if (this.formulario.valid) {
      let datos = new Datos(
        this.formulario.value.ruc, 
        this.formulario.value.sueldo, 
        this.calculateTotal()
      );
      this.impuesto = datos.getImpuesto();
      alert('Impuesto a la renta calculado correctamente');
      console.log(datos);
      const datosArray = this.generateJsonArray([datos]);
      this.dataArray.push(...datosArray); // Asegurarse de que datosArray sea un arreglo de objetos
      this.saveData();
    } else {
      alert('Formulario inválido, por favor revise los campos.');
    }
  }

  calculateTotal(): number {
    return this.formulario.value.alimentos + 
           this.formulario.value.vivienda + 
           this.formulario.value.educacion +
           this.formulario.value.vestimenta + 
           this.formulario.value.salud;
  }

  ngOnInit():void{
    this.loadJson();
  }  

  loadJson() {
    this.http.get<any[]>('../../../assets/calculos.json').subscribe(
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

export function sumValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const alimentos = formGroup.get('alimentos')?.value || 0;
    const vivienda = formGroup.get('vivienda')?.value || 0;
    const educacion = formGroup.get('educacion')?.value || 0;
    const vestimenta = formGroup.get('vestimenta')?.value || 0;
    const salud = formGroup.get('salud')?.value || 0;

    const sum = alimentos + vivienda + educacion + vestimenta + salud;
    return sum <= 15238.6 ? null : { sumExceeded: true };
  };
}