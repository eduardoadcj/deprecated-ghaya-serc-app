import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { CadastroClienteComponent } from './components/cliente/cadastro-cliente/cadastro-cliente.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { RelatorioClienteComponent } from './components/admin/cliente/relatorio-cliente/relatorio-cliente.component';
import { EditClienteComponent } from './components/admin/cliente/edit-cliente/edit-cliente.component';
import { Error404Component } from './components/error404/error404.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';

const routes: Routes = [
  {path: '', component: CadastroClienteComponent},
  {path: 'maintenance', component: MaintenanceComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'clientes', component: RelatorioClienteComponent},
  {path: 'cliente-edit', component: EditClienteComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
