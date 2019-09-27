import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { ClienteDetalhesComponent } from './cliente-detalhes/cliente-detalhes.component';



const cursosRoutes: Routes = [
    { path: '', component: ClienteListComponent, canActivate: [AuthGuardService]  },
    { path: 'cliente', component: ClienteCreateComponent, canActivate: [AuthGuardService]  },
    { path: 'cliente/:id', component: ClienteCreateComponent, canActivate: [AuthGuardService]  },
    { path: 'detalhes/:id', component: ClienteDetalhesComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forChild(cursosRoutes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule {}
