import { Component, OnInit } from '@angular/core';
import { faInstagram, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;
  faFacebook = faFacebook;

  constructor() { }

  ngOnInit(): void {
  }

}
