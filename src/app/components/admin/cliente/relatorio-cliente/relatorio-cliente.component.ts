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

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.get(0, (response) => {
      if(response.error){
        console.log(response.error);
      }else{
        this.xTotalCount = response.xTotalCount;
        response.data.forEach(cliente => this.clientes.push(cliente));
      }
    });
  }

  onScrollDown(){
    if(this.currentPage < this.xTotalCount / 25 - 1){
      this.currentPage++;
      this.clienteService.get(this.currentPage, (response) => {
        if(response.error){
          console.log(response.error);
        }else{
          this.xTotalCount = response.xTotalCount;
          response.data.forEach(cliente => this.clientes.push(cliente));
        }
      });
    }else{
      console.log('chego no final');
    }
  }

}
