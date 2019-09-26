import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/share/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Observable, EMPTY } from 'rxjs';
import { Documento } from 'src/app/share/models/documento';
import { UploadFileService } from '../services/upload-file.service';
import { environment } from 'src/environments/environment';
import { uploadProgress, filterResponse } from 'src/app/share/services/rxjs-operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlertModalService } from 'src/app/share/services/alert-modal.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.component.html',
  styleUrls: ['./cliente-detalhes.component.css'],
  preserveWhitespaces: true
})
export class ClienteDetalhesComponent implements OnInit {

  documentos$: Observable<Documento[]>;
  files: Set<File>;
  progress = 0;
  id: number;
  cliente: Cliente;
  exibirUpload: boolean = false;
  documentoSelecionado: Documento;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clienteService: ClienteService,
              private uploadFileService: UploadFileService,
              private alertService: AlertModalService) { }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;

    this.clienteService.getCliente(this.id)
      .subscribe(data => {
        console.log(data);
        this.cliente = data;
      }, error => console.log(error));

    this.reloadData();
  }

  reloadData() {
    this.documentos$ = this.clienteService.getDocumentoCliente(this.id);
  }

  onChange(event) {
    console.log(event);

    const selectedFiles =  event.srcElement.files as FileList;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');

    this.progress = 0;
  }

  list() {
    this.router.navigate(['clientes']);
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
    this.uploadFileService.upload(this.files, `${environment.API_URL}/clientes/1/documento-upload`)
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => { console.log('Upload Concluído');
        this.exibirUpload = false;
        this.reloadData();
      });
    }
  }
  download(id: number, nomeArquivo: string) {
    this.uploadFileService.download(`${environment.API_URL}/clientes/${id}/documento-download`)
    .subscribe((res: any) => {
      this.uploadFileService.handleFile(res, nomeArquivo);
    });
  }

  onExibirUpload() {
    this.exibirUpload = true;
  }


  onDelete(documento) {
    this.documentoSelecionado = documento;

    const result$ = this.alertService.showConfirm('Atenção', 'Tem certeza que deseja remover esse documento?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.clienteService.removerDocumento(documento.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.reloadData();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover documento. Tente novamente mais tarde.');
      }
    );
  }
}
