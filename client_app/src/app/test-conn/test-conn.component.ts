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

  testStr = ""
  pizzas = [{
    pizzaId: null,
    size: null,
    name: "",
    price: null,
    mass: null
  }]

  constructor(private pizzaService: ModalPizzaService) { }

  inParents(i: any) {
    this.pizzaService.pizzas[0] = this.pizzas[i]
    this.pizzaService.pizzas[1] = this.pizzas[i+1]
    this.pizzaService.pizzas[2] = this.pizzas[i+2]
    
    
  }
  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  ngOnInit(): void {
    axios.get('http://localhost:1234/testconn')
      .then((res) => {
        this.pizzas = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

}
