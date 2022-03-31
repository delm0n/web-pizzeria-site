import { Component, OnInit } from '@angular/core';
import axios from 'axios';
//import { ModalPizzaService } from '../../../modal-pizza.service';
import { ModalPizzaService } from '../../../myservices/modal-pizza/modal-pizza.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingreds = [{
    ingredientId: 0,
    name: "",
    urlImg: "",
    price: 0,
    mass: 0
  }]

  boolArrayView: boolean[] = [];

  constructor(private pizzaService: ModalPizzaService) { }

  addIngred(id: number, index: number) {

    this.pizzaService.boolArrayServ[index] = !this.pizzaService.boolArrayServ[index]

    //регулирем итоговую цену за доп. ингредиенты
    if(this.pizzaService.boolArrayServ[index]) {
      this.pizzaService.plusPrice(this.ingreds[index].price);
    }
    else {
      this.pizzaService.minusPrice(this.ingreds[index].price);
    }   
  }

  ngOnInit(): void {
    axios.get('http://localhost:1234/ingreds')
      .then((res) => {
        this.ingreds = res.data;
        this.pizzaService.ingredientArray = res.data;
        if (this.pizzaService.step == 0) {
          this.pizzaService.setBooler(this.ingreds.filter(function (v) { return v.hasOwnProperty('ingredientId'); }).length);
        }
        else {
          //..
        }  
        this.boolArrayView = this.pizzaService.boolArrayServ     
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
