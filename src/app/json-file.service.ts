import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonFileService {

  private apiUrl = 'http://localhost/3000/api/save-json'; // URL de tu endpoint backend

  constructor(private http: HttpClient) { }

  saveJsonData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
