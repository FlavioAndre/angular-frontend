import { ClienteCreateComponent } from './cliente/cliente-create/cliente-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './erros/not-found/not-found.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './home/login/login.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteDetatalhesComponent } from './cliente/cliente-detatalhes/cliente-detatalhes.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteCreateComponent },
  { path: 'clientes', component: ClienteListComponent, canActivate: [AuthGuardService] },
  { path: 'detalhes/:id', component: ClienteDetatalhesComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
