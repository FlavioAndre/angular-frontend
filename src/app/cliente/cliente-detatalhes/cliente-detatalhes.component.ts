import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/share/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-detatalhes',
  templateUrl: './cliente-detatalhes.component.html',
  styleUrls: ['./cliente-detatalhes.component.css']
})
export class ClienteDetatalhesComponent implements OnInit {

  id: number;
  cliente: Cliente;

  constructor(private route: ActivatedRoute, private router: Router,
    private clienteService: ClienteService) { }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;

    this.clienteService.getCliente(this.id)
      .subscribe(data => {
        console.log(data);
        this.cliente = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['clientes']);
  }

}
