import { Component, OnInit } from '@angular/core';
import { faInstagram, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { SecurityService } from 'src/app/core/security/security.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CidadeEstadoService } from 'src/app/services/cidade-estado/cidade-estado.service';
import { Estado } from 'src/app/services/cidade-estado/model/estado';
import { Observable } from 'rxjs';
import { Cidade } from 'src/app/services/cidade-estado/model/cidade';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;
  faFacebook = faFacebook;

  form: FormGroup;

  estados: Observable<Estado[]>;
  cidadesCasa: Observable<Cidade[]>;
  cidadesTrabalho: Observable<Cidade[]>;

  constructor(private security: SecurityService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cidadeEstadoService: CidadeEstadoService) { }

  ngOnInit(): void {

    this.checkApiConnection();

    this.estados = this.cidadeEstadoService.getEstados();

    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      whatsapp: new FormControl('', [Validators.required, Validators.minLength(15)]),
      cpf: new FormControl('', [Validators.required]),
      nCalcado: new FormControl('', [Validators.required]),
      nJeans: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      enderecoCasa: this.formBuilder.group({
        cep: new FormControl(''),
        estado: new FormControl('', [Validators.required]),
        cidade: new FormControl('', [Validators.required]),
        bairro: new FormControl('', [Validators.required]),
        rua: new FormControl('', [Validators.required]),
        numero: new FormControl('', [Validators.required]),
        complemento: new FormControl(''),
      }),
      enderecoTrabalho: this.formBuilder.group({
        cep: new FormControl(''),
        estado: new FormControl(''),
        cidade: new FormControl(''),
        bairro: new FormControl(''),
        rua: new FormControl(''),
        numero: new FormControl(''),
        complemento: new FormControl(''),
      })
    });

  }

  checkApiConnection(): void {
    if (!this.security.getToken()) {
      this.security.login(err => {
        if (err) {
          console.log(err);
          this.router.navigate(['maintenance']);
          return;
        }
        console.log(this.security.getToken());
      });
    }
  }

  updateCidades(which: string){
    if(which === 'casa'){
      let uf: string = this.form.get('enderecoCasa.estado').value;
      if(!uf){
        this.cidadesCasa = null;
        return;
      }
      this.cidadesCasa = this.cidadeEstadoService.getCidadesByUf(uf);
    }else if(which === 'trabalho'){
      
      let uf: string = this.form.get('enderecoTrabalho.estado').value;
      if(!uf){
        this.cidadesTrabalho = null;
        return;
      }
      this.cidadesTrabalho = this.cidadeEstadoService.getCidadesByUf(uf);
    }
  }

  save(): void {

    if (this.form.valid) {
      console.log(this.form);
    } else {
      this.validateAllFormFields(this.form);
    }

  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
