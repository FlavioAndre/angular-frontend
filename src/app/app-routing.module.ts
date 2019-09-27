
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteCreateComponent } from './cliente/cliente-create/cliente-create.component';
import { NotFoundComponent } from './erros/not-found/not-found.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './home/login/login.component';

const routes: Routes = [

  {
    path: 'clientes',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
    , canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
