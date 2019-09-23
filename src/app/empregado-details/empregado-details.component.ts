import { Component, OnInit } from '@angular/core';
import { Empregado } from '../empregado';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpregadoService } from '../empregado.service';

@Component({
  selector: 'app-empregado-details',
  templateUrl: './empregado-details.component.html',
  styleUrls: ['./empregado-details.component.css']
})
export class EmpregadoDetailsComponent implements OnInit {
  id: number;
  empregado: Empregado;

  constructor(private route: ActivatedRoute, private router: Router,
    private empregadoService: EmpregadoService) { }

  ngOnInit() {
    this.empregado = new Empregado();

    this.id = this.route.snapshot.params.id;

    this.empregadoService.get(this.id)
      .subscribe(data => {
        console.log(data);
        this.empregado = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['empregados']);
  }


}
