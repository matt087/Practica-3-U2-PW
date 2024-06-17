import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  constructor(){}
  ngOnInit():void
  {}
  ruc:string = '';
  valor:number=0.0;
  gasto:string='';

  obtenerImponible(ingresos: number, gastos: number):number
  {
      return ingresos - gastos;
  }

  obtenerFraccionBasica(ingresos:number):number
  {
    let fBasica:number = 0.0;
      if(ingresos < 11722)
        fBasica = 0;
      else if (ingresos >= 11722 && ingresos < 14930)
        fBasica = 11722;
      else if (ingresos >= 14930 && ingresos < 19385)
        fBasica = 14930;
      else if (ingresos >= 19385 && ingresos < 25638)
        fBasica = 19385;
      else if (ingresos >= 25638 && ingresos < 33738)
        fBasica = 25638;
      else if (ingresos >= 33738 && ingresos < 44721)
        fBasica = 33738;
      else if (ingresos >= 44721 && ingresos < 59537)
        fBasica = 44721;
      else if (ingresos >= 59537 && ingresos < 79388)
        fBasica = 59537;

      return fBasica;
  }
}
