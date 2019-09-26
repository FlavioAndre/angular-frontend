import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { SharedModule } from '../share/shared.module';
import { ClienteDetalhesComponent } from './cliente-detalhes/cliente-detalhes.component';

@NgModule({
  declarations: [ClienteListComponent, ClienteCreateComponent, ClienteDetalhesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClienteModule { }
