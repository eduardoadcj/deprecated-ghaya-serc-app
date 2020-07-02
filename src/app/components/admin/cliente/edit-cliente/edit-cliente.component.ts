import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/api/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  cliente: Cliente = new Cliente();

  error: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
     private clienteService: ClienteService,
     private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      this.clienteService.getById(+params.get('id'), response => {
        if(response.error){
          console.log(response.error);
          this.error = true;
        }else{
          this.error = false;
          this.cliente = response.data;
        }
      })
    })
  }

}
