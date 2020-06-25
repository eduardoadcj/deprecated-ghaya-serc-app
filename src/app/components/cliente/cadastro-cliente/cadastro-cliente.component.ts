import { Component, OnInit, Input } from '@angular/core';
import { faInstagram, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { SecurityService } from 'src/app/core/security/security.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CidadeEstadoService } from 'src/app/services/cidade-estado/cidade-estado.service';
import { Estado } from 'src/app/services/cidade-estado/model/estado';
import { Observable } from 'rxjs';
import { Cidade } from 'src/app/services/cidade-estado/model/cidade';
import { ViaCepService } from 'src/app/services/via-cep/via-cep.service';
import { ViaEndereco } from 'src/app/services/via-cep/model/via-endereco';
import { AngularBasicValidators } from 'src/app/util/validators/angular-basic-validators';
import { Cliente } from 'src/app/model/cliente';
import { DateOperator } from 'src/app/util/operators/date-operator';
import { Endereco } from 'src/app/model/endereco';
import { ClienteService } from 'src/app/services/api/cliente.service';

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

  onLoadedCidadeCasa = () => { };
  onLoadedCidadeTrabalho = () => { };

  sendLoading: boolean = false;
  errorMessage: string;
  showError: boolean = false;

  estados: Observable<Estado[]>;
  cidadesCasa: Observable<Cidade[]>;
  cidadesTrabalho: Observable<Cidade[]>;

  constructor(private security: SecurityService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cidadeEstadoService: CidadeEstadoService,
    private viaCepService: ViaCepService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.estados = this.cidadeEstadoService.getEstados();

    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      whatsapp: new FormControl('', [Validators.minLength(11), Validators.required]),
      cpf: new FormControl('', [Validators.required, AngularBasicValidators.cpf]),
      nCalcado: new FormControl('', [Validators.required]),
      nJeans: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required, AngularBasicValidators.birthdate]),
      enderecoCasa: this.formBuilder.group({
        cep: new FormControl(''),
        estado: new FormControl('', [Validators.required]),
        cidade: new FormControl('', [Validators.required]),
        bairro: new FormControl('', [Validators.required]),
        rua: new FormControl('', [Validators.required]),
        numero: new FormControl('', [Validators.required]),
        complemento: new FormControl(''),
      }),
      getEnderecoTrabalho: new FormControl(false),
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

  attemptRegister(): void {
    if (this.form.valid && !this.sendLoading) {
      this.sendLoading = true;
      let cliente: Cliente = new Cliente();

      cliente.nome = this.form.get('nome').value;
      cliente.email = this.form.get('email').value;
      cliente.cpf = this.form.get('cpf').value;
      cliente.whatsapp = this.form.get('whatsapp').value;
      cliente.nascimento = DateOperator.getDateByString(
        DateOperator.formatDate(this.form.get('dataNascimento').value));
      cliente.numeroJeans = this.form.get('nJeans').value;
      cliente.numeroCalcado = this.form.get('nCalcado').value;

      cliente.enderecos = new Array<Endereco>();

      let enderecoCasa: Endereco = {
        titulo: 'casa',
        ...this.form.get('enderecoCasa').value
      }

      cliente.enderecos.push(enderecoCasa);

      if (this.form.get('getEnderecoTrabalho').value) {
        let enderecoTrabalho: Endereco = {
          titulo: 'trabalho',
          ...this.form.get('enderecoTrabalho').value
        }
        cliente.enderecos.push(enderecoTrabalho);
      }

      this.register(cliente);

    } else {
      this.validateAllFormFields(this.form);
    }
  }

  register(cliente: Cliente): void {
    this.clienteService.save(cliente, err => {
      this.setLoading(false);
      if (err) {
        this.throwError(err);
      }
    })
  }

  throwError(err) {
    console.log(err);
    this.showError = true;
    let definitionErr = err.error.error;
    if (err.error.error) {
      if (definitionErr === 'cpf_already_registered') {
        this.errorMessage = "Ops... Parece que um cliente com este CPF já foi registrado.";
        return;
      } else if (definitionErr === 'validation_error') {
        this.errorMessage = "Ops... Parece que as informações preenchidas estão inválidas.";
        return;
      }
    }
    this.errorMessage = "Houve um erro ao enviar suas informações!";
  }

  updateCidades(which: string) {
    if (which === 'casa') {
      let uf: string = this.form.get('enderecoCasa.estado').value;
      if (!uf) {
        this.cidadesCasa = null;
        return;
      }
      this.cidadesCasa = this.cidadeEstadoService.getCidadesByUf(uf);
    } else if (which === 'trabalho') {
      let uf: string = this.form.get('enderecoTrabalho.estado').value;
      if (!uf) {
        this.cidadesTrabalho = null;
        return;
      }
      this.cidadesTrabalho = this.cidadeEstadoService.getCidadesByUf(uf);
    }
  }

  searchCepCasa(cep: string): void {

    if (cep.length != 9) {
      return;
    }

    cep.replace('-', '');
    this.viaCepService.getEnderecoByCep(cep).subscribe((endereco: ViaEndereco) => {

      if (endereco.erro) {
        this.form.get('enderecoCasa.cep').setErrors({ 'error': true })
        return;
      }

      this.form.get('enderecoCasa.estado').setValue(endereco.uf);
      this.updateCidades('casa');

      this.onLoadedCidadeCasa = () => {
        this.form.get('enderecoCasa.cidade').setValue(endereco.localidade);
        this.onLoadedCidadeCasa = () => { };
      }

      this.form.get('enderecoCasa.bairro').setValue(endereco.bairro);
      this.form.get('enderecoCasa.rua').setValue(endereco.logradouro);
      this.form.get('enderecoCasa.complemento').setValue(endereco.complemento);

    });

  }

  searchCepTrabalho(cep: string): void {

    if (cep.length != 9) {
      return;
    }

    cep.replace('-', '');

    this.viaCepService.getEnderecoByCep(cep).subscribe((endereco: ViaEndereco) => {

      if (endereco.erro) {
        this.form.get('enderecoTrabalho.cep').setErrors({ 'error': true })
        return;
      }

      this.form.get('enderecoTrabalho.estado').setValue(endereco.uf);
      this.updateCidades('trabalho');

      this.onLoadedCidadeTrabalho = () => {
        this.form.get('enderecoTrabalho.cidade').setValue(endereco.localidade);
        this.onLoadedCidadeTrabalho = () => { };
      }

      this.form.get('enderecoTrabalho.bairro').setValue(endereco.bairro);
      this.form.get('enderecoTrabalho.rua').setValue(endereco.logradouro);
      this.form.get('enderecoTrabalho.complemento').setValue(endereco.complemento);

    });

  }

  setLoading(option: boolean) {
    this.sendLoading = option;
    if (option) {
      this.form.disable();
    } else {
      this.form.enable();
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
