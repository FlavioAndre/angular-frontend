import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { DropdownService } from 'src/app/share/services/dropdown.service';
import { EstadoBr } from 'src/app/share/models/estado-br.model';
import { Cidade } from 'src/app/share/models/cidade';
import { distinctUntilChanged, tap, switchMap, map } from 'rxjs/operators';
import { empty, pipe, of } from 'rxjs';
import { FormValidations } from 'src/app/share/form-validations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EstadoService } from '../services/estado.service';
import { ClienteService } from '../services/cliente.service';
import { ConsultaCepService } from 'src/app/share/services/consulta-cep.service';
import { MunicipioService } from '../services/municipio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/share/models/cliente';
import { AlertModalService } from 'src/app/share/services/alert-modal.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  estados: EstadoBr[];
  cidades: Cidade[];
  cliente: Cliente;
  tipoPessoas: any[];
  formulario: FormGroup;
  id: number;
  constructor(
    private routeActivated: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private modal: AlertModalService,
    private estadoService: EstadoService,
    private municipioService: MunicipioService,
    private clienteService: ClienteService,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService
  ) {

  }

  ngOnInit() {

    this.id = this.routeActivated.snapshot.params.id;

    this.formulario = this.formBuilder.group({
      id: [null],
      codigoTipoCliente: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email]],
      cep: [null, [Validators.required, FormValidations.cepValidator]],
      numero: [null, Validators.required],
      complemento: [null],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      telefone: [null],
      cpfOuCnpj: [null, [Validators.required, FormValidations.cpfCnpjValidator]]

    });

    this.tipoPessoas = this.dropdownService.getTipoPessoa();

    this.estadoService.getEstadosBr()
      .subscribe(dados => this.estados = dados);

    this.formulario.get('cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('cep').value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});


    this.formulario.get('estado').valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: number) => this.buscaCidades(estadoId)),
        tap(console.log),
      )
      .subscribe(cidades => { this.cidades = cidades; this.setComboCidade(); });

    this.buscarDadosDoCliente();
  }


  private buscarDadosDoCliente() {
     if (this.id !== undefined && this.id !== null) {
      this.clienteService.getCliente(this.id)
      .subscribe(data => {
        this.cliente = data;

        this.formulario.patchValue(data);
        this.formulario.markAllAsTouched();
        this.formulario.markAsDirty();
      }, error => console.log(error));
     }

  }

  setComboCidade() {

    const nomeCidade = this.formulario.get('cidade').value;
    this.formulario.patchValue({
      cidade: nomeCidade.toUpperCase(),
    });
  }

  isNumber(value: string | number): boolean {
    return ((value != null) && !isNaN(Number(value.toString())));
  }

  buscaCidades(estadoId: number) {
    console.log('Id do estado: ' + estadoId);
    if (!this.isNumber(estadoId)) {
      return of();
    }
    return this.municipioService.getCidades(estadoId);
  }

  consultaCEP() {
    const cep = this.formulario.get('cep').value;
    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados) {

    this.formulario.patchValue({

      rua: dados.logradouro,
      cep: (dados != null && dados.cep != null ? dados.cep.replace('-', '') : ''),
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf

    });


  }

  resetaDadosForm() {
    this.formulario.reset();
  }


  prepareOptions(options?: any) {
    if (!options) {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      options = { headers };
    }
    return options;
  }

  submit() {

    const dataBody = JSON.stringify(this.formulario.value);
    this.clienteService
    .save(this.id, dataBody)
      .subscribe(
        dados => {
          this.modal.showAlertSuccess('Cliente Salvo com sucesso!');
          this.router.navigate(['/clientes']);
        },
        (error: any) => alert(error)
      );
  }


  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo).hasError('required') &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors.email && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'form-control-feedback': this.verificaValidTouched(campo)
    };
  }
}
