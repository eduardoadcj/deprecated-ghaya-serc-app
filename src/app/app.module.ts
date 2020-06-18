import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './core/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroClienteComponent } from './components/cliente/cadastro-cliente/cadastro-cliente.component';
import { firebaseConfig } from 'src/environments/environment';
import { NgxMaskModule } from 'ngx-mask';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { IconsModule } from './icons/feather/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RelatorioClienteComponent } from './components/admin/cliente/relatorio-cliente/relatorio-cliente.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ViewClienteComponent } from './components/admin/cliente/view-cliente/view-cliente.component';
import { EditClienteComponent } from './components/admin/cliente/edit-cliente/edit-cliente.component';
import { SecurityService } from './core/security/security.service';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './components/error404/error404.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    CadastroClienteComponent,
    DashboardComponent,
    MenuComponent,
    RelatorioClienteComponent,
    ViewClienteComponent,
    EditClienteComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    IconsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    HttpClientModule
  ],
  providers: [AuthService, SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
