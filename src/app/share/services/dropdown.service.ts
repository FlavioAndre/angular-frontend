import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from './../models/estado-br.model';
import { Cidade } from '../models/cidade';
import { map } from '../../../../node_modules/rxjs/operators';

@Injectable()
export class DropdownService {
  constructor(private http: HttpClient) { }


  getTipoPessoa() {
    return [
      { valor: '1', desc: 'Pessoa Física' },
      { valor: '2', desc: 'Pessoa Jurídica' }
    ];
  }
}
