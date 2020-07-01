import { Component, OnInit } from '@angular/core';
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { ClienteService } from 'src/app/services/api/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { MaskOperator } from 'src/app/util/operators/mask-operator';

@Component({
  selector: 'app-relatorio-cliente',
  templateUrl: './relatorio-cliente.component.html',
  styleUrls: ['./relatorio-cliente.component.css']
})
export class RelatorioClienteComponent implements OnInit {

  maskOperator: MaskOperator = new MaskOperator();

  faSearch = faSearch;
  faEye = faEye;

  xTotalCount: number;
  currentPage: number = 0;
  clientes = new Array<Cliente>();

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  nome: string;
  nCalcado: string;
  nJeans: string;

  queryNome: string;
  queryNCalcado: string;
  queryNJeans: string;

  selectedCliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.loadList();
  }

  onScrollDown() {
    if (this.currentPage < this.xTotalCount / 25 - 1) {
      this.currentPage++;
      this.loadList();
    }
  }

  loadList(): void {

    if (!this.queryNome && !this.queryNJeans && !this.queryNCalcado) {

      this.clienteService.get(this.currentPage, (response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.xTotalCount = response.xTotalCount;
          response.data.forEach(cliente => this.clientes.push(cliente));
        }
      });

    } else {

      this.clienteService.getConsulta(this.currentPage, {
        nome: this.queryNome,
        numeroCalcado: this.queryNCalcado,
        numeroJeans: this.queryNJeans
      }, (response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.xTotalCount = response.xTotalCount;
          response.data.forEach(cliente => this.clientes.push(cliente));
        }
      });

    }

  }

  setUpConsulta(): void {

    if (!this.nome && !this.nCalcado && !this.nJeans) {
      return;
    }

    this.clientes = [];

    this.queryNome = this.nome ? this.nome : '';
    this.queryNCalcado = this.nCalcado ? this.nCalcado : '';
    this.queryNJeans = this.nJeans ? this.nJeans : '';

    this.currentPage = 0;

    this.loadList();

  }

  setSelectedCliente(cliente: Cliente){
    this.selectedCliente = cliente;
  }

}
