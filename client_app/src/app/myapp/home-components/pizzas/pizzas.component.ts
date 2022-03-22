import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { ModalPizzaService } from '../../../modal-pizza.service';
import { HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('block', style({
        
        // opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
        // display: 'none'
      })),

      transition('block => hidden', [
        animate('0s')
      ]),
      transition('hidden => block', [
        animate(
          '0.7s',
          keyframes([
            style({ visibility: 'hidden', offset: 0 }),
            style({ visibility: 'visible', offset: 0.4 }),
            style({ opacity: 1, offset: 0.7 }),
          ])
        )
      ]),
    ]),
  ],
})
export class PizzasComponent implements OnInit {

  pizzas = [{
    pizzaId: null,
    pizzaName: "",
    structure: "",
    urlImg: "",
    minPrice: null,
  }]

  modalPizzas = {
    pizzaId: null,
    pizzaName: "",
    urlImg: "",
    structure: "",
    sizes: [{
      pizzaSizeId: null,
      name : "", //имя размера
      price: null,
      mass: null
    },
    {
      pizzaSizeId: null,
      name : "", //имя размера
      price: null,
      mass: null
    },
    {
      pizzaSizeId: null,
      name : "", //имя размера
      price: null,
      mass: null
    }
  ]}
  
  active_status = 0

  modal: boolean = true;
  modalBtn(){

    this.modal=!this.modal;

    this.modalPizzas = {pizzaId: null,
      pizzaName: "",
      urlImg: "",
      structure: "",
      sizes: [{
        pizzaSizeId: null,
        name : "", //имя размера
        price: null,
        mass: null
      }]};

      this.active_status = 0;
  }
  
  openPizzaModal(i: any, i_name: string, i_url: string, i_struct: string) {
    axios.get('http://localhost:1234//sizeofasync/'+i)
      .then((res) => {
        
        this.modalPizzas.pizzaId = i;
        this.modalPizzas.pizzaName = i_name;
        this.modalPizzas.urlImg = i_url;
        this.modalPizzas.structure = i_struct;

        this.modalPizzas.sizes = res.data;     
        console.log(this.modalPizzas);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  constructor(private pizzaService: ModalPizzaService) { }
  //this.pizzaService.getSizes(i) - обращаемся к сервису

  
  
  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  ngOnInit(): void {
    axios.get('http://localhost:1234/pizza')
      .then((res) => {
        this.pizzas = res.data;
        console.log(this.pizzas);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

}
