import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmpregadoService {

  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/empregados`);
  }

  post(empregado: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/empregados`, empregado);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/empregados/${id}`);
  }

  put(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/empregados/${id}`, value);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/empregados/${id}`, { responseType: 'text' });
  }

}
