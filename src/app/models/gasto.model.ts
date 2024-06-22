export class Gasto{

    private tipo: string;
    private ruc: string;
    private valor: Float32Array;

    constructor(tipo: string, ruc: string, valor: Float32Array)
    {
        this.tipo=tipo;
        this.ruc=ruc;
        this.valor = valor;
    };

    toJson(): object {
        return {
          tipo: this.tipo,
          ruc: this.ruc,
          valor: this.valor,
        };
      }
}