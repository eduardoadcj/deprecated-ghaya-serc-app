import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  err: string = "";
  loading = false;

  form: FormGroup = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.auth.logout().then(() => {
      this.auth.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['']);
        }
      });
    });
  }

  ngOnInit() {
  }

  login(): void {
    if (this.valid()) {
      this.isLoading(true);
      this.auth.login(this.form.value['email'], this.form.value['password'], (result) => {
        if (!result) {
          this.err = "Usuário ou senha inválida!";
        }
        this.isLoading(false);
      });
    }
  }

  isLoading(value: boolean): void {
    this.loading = value;
    if (value) {
      this.form.get('email').disable();
      this.form.get('password').disable();
    } else {
      this.form.get('email').enable();
      this.form.get('password').enable();
    }
  }

  valid(): boolean {
    this.err = "";
    let email = this.form.value['email'];
    let pwd = this.form.value['password'];
    if (!email) {
      return false;
    } else {
      if (!email.includes('@')) {
        return false;
      }
    }
    if (!pwd) {
      return false
    }
    return true;
  }

}
