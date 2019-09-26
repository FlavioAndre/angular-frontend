import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/share/models/cliente';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {


  clientes$: Observable<Cliente[]>;

  constructor(private clienteservice: ClienteService,
    private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.clientes$ = this.clienteservice.getClientes();
  }

  excluirCliente(id: number) {
    /* this.clienteservice.delete(id)
       .subscribe(
         data => {
           console.log(data);
           this.reloadData();
         },
         error => console.log(error));*/
  }

  exibirDetalhes(id: number) {
    this.router.navigate(['detalhes', id]);
  }

}
