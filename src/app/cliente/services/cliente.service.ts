import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get<any>(`${this.baseUrl}/clientes`).pipe(take(1));
  }

  getCliente(idCLiente: any) {
    return this.http.get<any>(`${this.baseUrl}/clientes/${idCLiente}`).pipe(take(1));
  }

  getDocumentoCliente(idCLiente: any) {
    return this.http.get<any>(`${this.baseUrl}/clientes/${idCLiente}/documento-cliente`).pipe(take(1));
  }

  removerDocumento(idDocumento: any) {
    return this.http.delete(`${this.baseUrl}/documentos/${idDocumento}`).pipe(take(1));
  }

  save(idCLiente: number, dataBody: string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (idCLiente !== null && idCLiente !== undefined) {
        return this.http .put(`${this.baseUrl}/clientes`, dataBody, httpOptions).pipe(take(1));
    }
    return this.http .post(`${this.baseUrl}/clientes`, dataBody, httpOptions).pipe(take(1));

  }

}
