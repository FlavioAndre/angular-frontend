import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get<any>(`'https://curso-angular-datainfo.herokuapp.com/clientes`);
  }

  getCliente(idCLiente: any) {
    return this.http.get<any>(`/api/clientes/${idCLiente}`);
  }

}
