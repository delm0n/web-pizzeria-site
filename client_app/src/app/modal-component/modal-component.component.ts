import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ModalPizzaService } from '../modal-pizza.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css'],
  providers: []
})
export class ModalComponentComponent implements OnInit, AfterViewChecked {


  pizzas = [{
    pizzaId: null,
    size: null,
    name: "",
    price: null,
    mass: null
  }]

  constructor(private pizzaService: ModalPizzaService) { }
  
  
  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {

    this.pizzas = this.pizzaService.pizzas

  }

  closeModal() {
    this.pizzaService.modalPizzaFlug = false
  }
}
