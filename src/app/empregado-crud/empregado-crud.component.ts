import { Component, OnInit } from '@angular/core';
import { Empregado } from '../empregado';
import { EmpregadoService } from '../empregado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empregado-crud',
  templateUrl: './empregado-crud.component.html',
  styleUrls: ['./empregado-crud.component.css']
})
export class EmpregadoCrudComponent implements OnInit {

  empregado: Empregado = new Empregado();
  submitted = false;

  constructor(private empregadoService: EmpregadoService,
    private router: Router) { }

  ngOnInit() {
  }

  newEmpregado(): void {
    this.submitted = false;
    this.empregado = new Empregado();
  }

  save() {
    this.empregadoService.post(this.empregado)
      .subscribe(data => {
        this.gotoList();
        console.log(data);
      }
        , error => console.log(error));

  }


  onSubmit() {
    this.submitted = true;
    this.empregado.active = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/empregados']);
  }
}
