export class Datos
{
  private ruc: string;
  private ingresos: number;
  private gastos: number;
  private fBasica: number;
  private imponible: number;
  private excedente: number;
  private pExcedente: number;
  private impuestoRenta: number;

  constructor(ruc: string, ingresos: number, gastos: number)
  {
    this.ruc = ruc;
    this.ingresos = ingresos;
    this.gastos = gastos;
    newFraccionBasica();
    newImponible();
    newExcedente();
    newPorcentajeExcedente();
    calculoImpuestoRenta();
  }

  newImponible():void
  {
     this.imponible = this.ingresos - this.gastos;
  }

  newFraccionBasica():void
  {
    if(this.ingresos < 11722)
        this.fBasica = 0;
    else if (this.ingresos >= 11722 && this.ingresos < 14930)
        this.fBasica = 11722;
    else if (this.ingresos >= 14930 && this.ingresos < 19385)
        this.fBasica = 14930;
    else if (this.ingresos >= 19385 && this.ingresos < 25638)
        this.fBasica = 19385;
    else if (this.ingresos >= 25638 && this.ingresos < 33738)
        this.fBasica = 25638;
    else if (this.ingresos >= 33738 && this.ingresos < 44721)
        this.fBasica = 33738;
    else if (this.ingresos >= 44721 && this.ingresos < 59537)
        this.fBasica = 44721;
    else if (this.ingresos >= 59537 && this.ingresos < 79388)
        this.fBasica = 59537;
    else if (this.ingresos >= 79388 && this.ingresos < 105.580)
        this.fBasica = 79388;
    else if (this.ingresos >= 105.580)
        this.fBasica = 105.580;
}

  newExcedente():void
  {
      this.excedente = this.imponible - this.fBasica;
  }

  newPorcentajeExcedente():void
  {
    let porcentaje:number = 0;
    if(this.ingresos < 11722)
        porcentaje = 0;
    else if (this.ingresos >= 11722 && this.ingresos < 14930)
        porcentaje = 0.5;
    else if (this.ingresos >= 14930 && this.ingresos < 19385)
        porcentaje = 0.10;
    else if (this.ingresos >= 19385 && this.ingresos < 25638)
        porcentaje = 0.12;
    else if (this.ingresos >= 25638 && this.ingresos < 33738)
        porcentaje = 0.15;
    else if (this.ingresos >= 33738 && this.ingresos < 44721)
        porcentaje = 0.20;
    else if (this.ingresos >= 44721 && this.ingresos < 59537)
        porcentaje = 0.25;
    else if (this.ingresos >= 59537 && this.ingresos < 79388)
        porcentaje = 0.30;
    else if (this.ingresos >= 79388 && this.ingresos < 105.580)
        porcentaje = 0.35;
    else if (this.ingresos >= 105.580)
        porcentaje = 0.37;

    this.pExcedente = this.excedente * porcentaje;
  }

  calculoImpuestoRenta():void
  {
    let impuestoFB: number = 0;
    if(this.ingresos < 11722)
        impuestoFB = 0;
    else if (this.ingresos >= 11722 && this.ingresos < 14930)
        impuestoFB = 0;
    else if (this.ingresos >= 14930 && this.ingresos < 19385)
        impuestoFB = 160;
    else if (this.ingresos >= 19385 && this.ingresos < 25638)
        impuestoFB = 606;
    else if (this.ingresos >= 25638 && this.ingresos < 33738)
        impuestoFB = 1356;
    else if (this.ingresos >= 33738 && this.ingresos < 44721)
        impuestoFB = 2571;
    else if (this.ingresos >= 44721 && this.ingresos < 59537)
        impuestoFB = 4768;
    else if (this.ingresos >= 59537 && this.ingresos < 79388)
        impuestoFB = 8472;
    else if (this.ingresos >= 79388 && this.ingresos < 105.580)
        impuestoFB = 14427;
    else if (this.ingresos >= 105.580)
        impuestoFB = 23594;

    this.impuestoRenta = impuestoFB + this.pExcedente;

  }

}



