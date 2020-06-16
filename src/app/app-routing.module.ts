import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { CadastroClienteComponent } from './components/cliente/cadastro-cliente/cadastro-cliente.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { RelatorioClienteComponent } from './components/admin/cliente/relatorio-cliente/relatorio-cliente.component';
import { ViewClienteComponent } from './components/admin/cliente/view-cliente/view-cliente.component';

const routes: Routes = [
  {path: '', component: CadastroClienteComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'clientes', component: RelatorioClienteComponent},
  {path: 'cliente-view', component: ViewClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
