import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonFileService {

  private apiUrl = 'http://localhost:3000/api/save-json'; // URL de tu endpoint backend
  private apiUrl2 = 'http://localhost:3000/api/save-info'; // URL de tu endpoint backend


  constructor(private http: HttpClient) { }

  saveJsonData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      catchError(error => {
        // Manejo de errores
        console.error('Error al guardar los datos', error);
        return throwError('Error al guardar los datos');
      })
    );
  }

  saveInfoData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, data).pipe(
      catchError(error => {
        // Manejo de errores
        console.error('Error al guardar los datos', error);
        return throwError('Error al guardar los datos');
      })
    );
  }

}
