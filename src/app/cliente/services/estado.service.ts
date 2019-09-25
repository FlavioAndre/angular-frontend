import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from 'src/app/share/models/estado-br.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }
  private baseUrl = environment.API_URL;

  getEstadosBr() {
    return this.http.get<EstadoBr[]>(`${this.baseUrl}/estados`);
  }
}
