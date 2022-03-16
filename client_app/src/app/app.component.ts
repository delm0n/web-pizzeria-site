import { Component, ChangeDetectorRef, AfterContentChecked, AfterContentInit } from '@angular/core';

import { ModalPizzaService } from './modal-pizza.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked  {
  title = 'client_app';
  flug = false

  constructor(private pizzaService: ModalPizzaService, private cdref: ChangeDetectorRef ) {}

  ngAfterContentChecked() {
    this.flug = this.pizzaService.modalPizzaFlug
    this.cdref.detectChanges();
  }

  


  // ngOnChanges(changes: SimpleChanges): void {
  //   this.flug = this.pizzaService.modalPizzaFlug
  //   console.log(1);
    
  // }

  
}
