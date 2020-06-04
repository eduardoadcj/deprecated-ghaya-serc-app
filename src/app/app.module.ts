import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './core/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';


const firebaseConfig = {
  apiKey: "AIzaSyDCFgO-Vk22uBpIFP73OgOmwYIFgsWx6hk",
  authDomain: "serc-app-9bda0.firebaseapp.com",
  databaseURL: "https://serc-app-9bda0.firebaseio.com",
  projectId: "serc-app-9bda0",
  storageBucket: "serc-app-9bda0.appspot.com",
  messagingSenderId: "928701718829",
  appId: "1:928701718829:web:33e3d6f2ba943fa5b9b3a4",
  measurementId: "G-PCYZVTSGF5"
}

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    CadastroClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
