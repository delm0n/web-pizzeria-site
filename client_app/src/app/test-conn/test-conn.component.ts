import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { ModalPizzaService } from '../modal-pizza.service';

@Component({
  selector: 'app-test-conn',
  templateUrl: './test-conn.component.html',
  styleUrls: ['./test-conn.component.css'],
  providers: []
})
export class TestConnComponent implements OnInit {
  
  //НАЧИНАТЬ С МАЛЕНЬКОЙ БУКВЫ
  pizzas = [{
      pizzaId: null,
      pizzaName: "",
      minPrice: null,

    }]
  // pizzas = [{
  //   pizzaId: null,
  //   size: null,
  //   name: "",
  //   price: null,
  //   mass: null
  // }]

  

  pizzasCard = [{
    pizzaId: null,
    name: "",
    price: null,
  }]

  constructor(private pizzaService: ModalPizzaService) { }

  inParents(i: any) {
    //this.pizzaService.pizzas = this.pizzas.filter(p => p.pizzaId === i || p.pizzaId === i+1 || p.pizzaId === i+2)
    console.log(i);
    this.pizzaService.getSizes(i)
    this.pizzaService.modalPizzaFlug = true
  }
  
  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  ngOnInit(): void {
    axios.get('http://localhost:1234/test')
      .then((res) => {
        this.pizzas = res.data;
        //console.log( res.data);
        console.log(this.pizzas);
        
        //this.pizzasCard = this.pizzas.filter(p => p.size === 0)
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
