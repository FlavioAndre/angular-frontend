import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get<any>(`${this.baseUrl}/clientes`);
  }

  getCliente(idCLiente: any) {
    return this.http.get<any>(`${this.baseUrl}/clientes/${idCLiente}`);
  }

}
