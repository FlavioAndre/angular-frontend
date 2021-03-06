import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  private baseUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  consultaCEP(cep: string) {

    console.log(cep);

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
         return this.http.get(`${this.baseUrl}/clientes/cep/${cep}`);
          
          //return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
