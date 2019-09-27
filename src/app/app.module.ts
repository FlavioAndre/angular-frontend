import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrosModule } from './erros/erros.module';
import { LoginComponent } from './home/login/login.component';
import { SharedModule } from './share/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClienteModule } from './cliente/cliente.module';
import { AlertModule } from 'ngx-bootstrap';
import { RequestInterceptor } from './auth/request.interceptor';
import { EmpregadoCrudComponent } from './empregado-crud/empregado-crud.component';
import { EmpregadoDetailsComponent } from './empregado-details/empregado-details.component';
import { EmpregadoListComponent } from './empregado-list/empregado-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpregadoCrudComponent,
    EmpregadoDetailsComponent,
    EmpregadoListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ErrosModule,
    AppRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ClienteModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
