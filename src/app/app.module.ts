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


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    CadastroClienteComponent,
    DashboardComponent,
    MenuComponent,
    RelatorioClienteComponent
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
    InfiniteScrollModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
