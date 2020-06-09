import { Component, OnInit } from '@angular/core';
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-relatorio-cliente',
  templateUrl: './relatorio-cliente.component.html',
  styleUrls: ['./relatorio-cliente.component.css']
})
export class RelatorioClienteComponent implements OnInit {

  faSearch = faSearch;
  faArrowRight = faArrowRight;

  preenchedor = [1,2,3,4,5,6,7,7]

  constructor() { }

  ngOnInit(): void {
  }

  //https://www.npmjs.com/package/ngx-infinite-scroll

}
