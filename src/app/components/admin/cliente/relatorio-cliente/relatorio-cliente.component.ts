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

  preenchedor = new Array();

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  constructor() { 

    for(let i = 0; i < 100; i++){
      this.preenchedor.push('');
    }

  }

  ngOnInit(): void {
  }

  onScrollDown(){
    console.log('Chego no final do scroll');
  }

  //https://www.npmjs.com/package/ngx-infinite-scroll

}
