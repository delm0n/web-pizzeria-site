import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { ModalPizzaService } from '../../../modal-pizza.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  pizzas = [{
    pizzaId: null,
    pizzaName: "",
    urlImg: "",
    minPrice: null,
  }]

  modalPizzas = {
    pizzaId: null,
    pizzaName: "",
    urlImg: "",
    sizes: [{
      pizzaSizeId: null,
      name : "", //имя размера
      price: null,
      mass: null
    }]
  }



  modal: boolean = true;
  modalBtn(){
    this.modal=!this.modal;
  }
  
  openPizzaModal(i: any, i_name: string, i_url: string) {
    axios.get('http://localhost:1234//sizeofasync/'+i)
      .then((res) => {
        this.modalPizzas.pizzaId = i;
        this.modalPizzas.pizzaName = i_name;
        this.modalPizzas.urlImg = i_url;

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
