import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/api/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Estado } from 'src/app/services/cidade-estado/model/estado';
import { Cidade } from 'src/app/services/cidade-estado/model/cidade';
import { CidadeEstadoService } from 'src/app/services/cidade-estado/cidade-estado.service';
import { ViaCepService } from 'src/app/services/via-cep/via-cep.service';
import { AngularBasicValidators } from 'src/app/util/validators/angular-basic-validators';
import { ViaEndereco } from 'src/app/services/via-cep/model/via-endereco';
import { DateOperator } from 'src/app/util/operators/date-operator';
import { Endereco } from 'src/app/model/endereco';
import { OptionModalComponent } from 'src/app/components/util/option-modal/option-modal.component';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faTrash = faTrash;

  dateOperator: DateOperator = new DateOperator();

  estados: Observable<Estado[]>;
  cidadesCasa: Observable<Cidade[]>;
  cidadesTrabalho: Observable<Cidade[]>;

  form: FormGroup;
  cliente: Cliente = new Cliente();
  onLoadedCidadeCasa = () => { };
  onLoadedCidadeTrabalho = () => { };
  onLoadedEstadoCasa = () => { }
  onLoadedEstadoTrabalho = () => { }

  error: boolean = false;
  loading: boolean = false;

  @ViewChild(OptionModalComponent) optionModal;

  constructor(private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private cidadeEstadoService: CidadeEstadoService,
    private viaCepService: ViaCepService,
    private router: Router) { }

  ngOnInit(): void {

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

    this.activatedRoute.paramMap.subscribe(params => {
      this.clienteService.getById(+params.get('id'), response => {
        if (response.error) {
          console.log(response.error);
          this.error = true;
        } else {
          this.cliente = response.data;
          this.setup();
        }
      })
    });

  }

  setup(): void {
    this.error = false;
    this.estados = this.cidadeEstadoService.getEstados();
    this.setValues();
  }

  setValues(): void {

    this.form.get('nome').setValue(this.cliente.nome);
    this.form.get('email').setValue(this.cliente.email);
    this.form.get('whatsapp').setValue(this.cliente.whatsapp);
    this.form.get('cpf').setValue(this.cliente.cpf);
    this.form.get('nCalcado').setValue(this.cliente.numeroCalcado);
    this.form.get('nJeans').setValue(this.cliente.numeroJeans);
    this.form.get('dataNascimento').setValue(this.dateOperator.printDate(this.cliente.nascimento).replace('/', ''));

    this.estados.subscribe(data => {

      this.form.get('enderecoCasa.cep').setValue(this.cliente.enderecos[0].cep);

      this.onLoadedEstadoCasa = () => {
        this.form.get('enderecoCasa.estado').setValue(this.cliente.enderecos[0].estado);
        this.updateCidades('casa');
        this.onLoadedCidadeCasa = () => {
          this.form.get('enderecoCasa.cidade').setValue(this.cliente.enderecos[0].cidade);
          this.onLoadedCidadeCasa = () => { }
        }
        this.onLoadedEstadoCasa = () => { }
      }

      this.form.get('enderecoCasa.bairro').setValue(this.cliente.enderecos[0].bairro);
      this.form.get('enderecoCasa.rua').setValue(this.cliente.enderecos[0].rua);
      this.form.get('enderecoCasa.numero').setValue(this.cliente.enderecos[0].numero);
      this.form.get('enderecoCasa.complemento').setValue(this.cliente.enderecos[0].complemento);

      if (this.cliente.enderecos.length > 1) {

        this.form.get('enderecoTrabalho.cep').setValue(this.cliente.enderecos[1].cep);

        this.onLoadedEstadoTrabalho = () => {
          this.form.get('enderecoTrabalho.estado').setValue(this.cliente.enderecos[1].estado);
          this.updateCidades('trabalho');
          this.onLoadedCidadeTrabalho = () => {
            this.form.get('enderecoTrabalho.cidade').setValue(this.cliente.enderecos[1].cidade);
            this.onLoadedCidadeTrabalho = () => { }
          }
          this.onLoadedEstadoTrabalho = () => { }
        }

        this.form.get('enderecoTrabalho.bairro').setValue(this.cliente.enderecos[1].bairro);
        this.form.get('enderecoTrabalho.rua').setValue(this.cliente.enderecos[1].rua);
        this.form.get('enderecoTrabalho.numero').setValue(this.cliente.enderecos[1].numero);
        this.form.get('enderecoTrabalho.complemento').setValue(this.cliente.enderecos[1].complemento);

      }

    });

  }

  attemptRegister(): void {
    if (this.form.valid && !this.loading) {
      this.loading = true;

      this.optionModal.show("Deseja alterar o cliente?", (result) => {
        if (result) {
          this.update(this.getFormData());
        } else {
          this.loading = false;
        }
      });

    } else {
      this.validateAllFormFields(this.form);
    }
  }

  attemptDelete(): void {
    this.loading = true;
    this.optionModal.show('Deseja excluir o cliente permanentemente?', result => {
      if (result) {
        this.delete();
      } else {
        this.loading = false;
      }
    });
  }

  getFormData(): Cliente {

    let cliente: Cliente = new Cliente();

    cliente.nome = this.form.get('nome').value;
    cliente.email = this.form.get('email').value;
    cliente.cpf = this.form.get('cpf').value;
    cliente.whatsapp = this.form.get('whatsapp').value;
    cliente.nascimento = this.dateOperator.getDateByString(
      this.dateOperator.formatDate(this.form.get('dataNascimento').value));
    cliente.numeroJeans = this.form.get('nJeans').value;
    cliente.numeroCalcado = this.form.get('nCalcado').value;

    cliente.enderecos = new Array<Endereco>();

    let enderecoCasa: Endereco = {
      titulo: 'casa',
      ...this.form.get('enderecoCasa').value
    }

    cliente.enderecos.push(enderecoCasa);

    if (this.form.get('enderecoTrabalho').value) {
      let enderecoTrabalho: Endereco = {
        titulo: 'trabalho',
        ...this.form.get('enderecoTrabalho').value
      }
      cliente.enderecos.push(enderecoTrabalho);
    }
    return cliente;

  }

  update(cliente: Cliente): void {
    
    cliente.id = this.cliente.id;
    cliente.enderecos[0].id = this.cliente.enderecos[0].id;
    if(this.cliente.enderecos.length === 2){
      cliente.enderecos[1].id = this.cliente.enderecos[1].id;
    }

    this.clienteService.update(cliente, err => {
      this.loading = false;
      if(err) {
        console.log(err);
      }else{
        this.router.navigate(['clientes']);
      }
    });

  }

  delete(): void {
    this.clienteService.delete(this.cliente.id, err => {
      this.loading = false;
      if (err) {
        console.log(err);
      } else {
        this.router.navigate(['clientes']);
      }
    })
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
