import { Cidade } from './../../share/models/cidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from 'src/app/share/models/estado-br.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http: HttpClient) { }

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>(`/api/municipios/muncipio-by-estado/${idEstado}`);
  }
}
