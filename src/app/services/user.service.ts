import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  obtenerDatos(){
    return this.http.get<Usuario[]>('https://jsonplaceholder.typicode.com/users');
    }
}
