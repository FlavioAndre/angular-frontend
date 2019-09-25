import { Cidade } from './../../share/models/cidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from 'src/app/share/models/estado-br.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private baseUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>(`${this.baseUrl}/municipios/muncipio-by-estado/${idEstado}`);
  }
}
