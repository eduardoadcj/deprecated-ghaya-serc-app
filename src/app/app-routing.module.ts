import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RelatorioClienteComponent } from './admin/cliente/relatorio-cliente/relatorio-cliente.component';

const routes: Routes = [
  {path: '', component: CadastroClienteComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'clientes', component: RelatorioClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
