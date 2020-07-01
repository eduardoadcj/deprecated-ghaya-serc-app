import { Component, OnInit, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { Cliente } from 'src/app/model/cliente';
import { MaskOperator } from 'src/app/util/operators/mask-operator';
import { EnderecoOperator } from 'src/app/util/operators/endereco-operator';
import { DateOperator } from 'src/app/util/operators/date-operator';

@Component({
  selector: 'app-view-cliente',
  templateUrl: './view-cliente.component.html',
  styleUrls: ['./view-cliente.component.css']
})
export class ViewClienteComponent implements OnInit {

  faEdit = faEdit;

  maskOperator: MaskOperator = new MaskOperator();
  enderecoOperator: EnderecoOperator = new EnderecoOperator();
  dateOperator: DateOperator = new DateOperator();

  @Input() cliente: Cliente;

  constructor() { }

  ngOnInit(): void {
  }

}
