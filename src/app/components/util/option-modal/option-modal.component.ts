import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-option-modal',
  templateUrl: './option-modal.component.html',
  styleUrls: ['./option-modal.component.css']
})
export class OptionModalComponent implements OnInit {

  faTimes = faTimes;
  faCheck = faCheck;

  message: string;
  onComplete = (result: boolean) => {};

  constructor() { }

  ngOnInit(): void {
  }

  show(message: string, onComplete): void{
    $('#optionModal').modal('show');
    this.message = message;
    this.onComplete = onComplete;
  }

  dispose(): void{
    $('#optionModal').modal('dispose');
  }

}
