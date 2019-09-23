import { Component, OnInit } from '@angular/core';
import { EmpregadoService } from '../empregado.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Empregado } from '../empregado';

@Component({
  selector: 'app-empregado-list',
  templateUrl: './empregado-list.component.html',
  styleUrls: ['./empregado-list.component.css']
})
export class EmpregadoListComponent implements OnInit {

  empregados$: Observable<Empregado[]>;

  constructor(private empregadoService: EmpregadoService,
    private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.empregados$ = this.empregadoService.getList();
  }

  excluirEmpregado(id: number) {
    this.empregadoService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  exibirDetalhes(id: number) {
    this.router.navigate(['detalhes', id]);
  }
}
