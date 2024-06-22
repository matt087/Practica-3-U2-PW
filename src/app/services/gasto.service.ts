import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Gasto } from '../models/gasto';

const configUrl='assets/datos.json';


@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private httpclient: HttpClient) {
    console.log('El servicio Http esta funcionando…')
    }

    obtenerDatos(){
    return this.httpclient.get<Gasto[]>(configUrl);
    }
}
