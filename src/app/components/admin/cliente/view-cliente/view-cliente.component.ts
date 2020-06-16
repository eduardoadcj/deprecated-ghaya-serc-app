import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-view-cliente',
  templateUrl: './view-cliente.component.html',
  styleUrls: ['./view-cliente.component.css']
})
export class ViewClienteComponent implements OnInit {

  faEdit = faEdit;

  constructor() { }

  ngOnInit(): void {
  }

}
