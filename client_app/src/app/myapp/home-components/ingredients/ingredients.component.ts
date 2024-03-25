import { Component, OnInit } from '@angular/core';
import axios from 'axios';
//import { ModalPizzaService } from '../../../modal-pizza.service';
import { ModalPizzaService } from '../../../myservices/modal-pizza/modal-pizza.service';
import { IngredientClass } from 'src/app/models/IngredientClass';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingreds: IngredientClass[] = [];
  boolArrayView: boolean[] = []; //выделение выбранных допов - массив true/false

  constructor(private pizzaService: ModalPizzaService, private router: Router,) { }

  addIngred(id: number, index: number) {

    //по клику добавляем/убираем доп
    this.pizzaService.boolArrayServ[index] = !this.pizzaService.boolArrayServ[index]

    //регулирем итоговую цену за доп. ингредиенты
    if(this.pizzaService.boolArrayServ[index]) {
      this.pizzaService.plusPrice(this.ingreds[index].Price);
    }
    else {
      this.pizzaService.minusPrice(this.ingreds[index].Price);
    }   
  }

  have_been_received: boolean = false;

  ingredsDict : IngredientClass[] = [
    {
        "IngredientId": 1,
        "Name": "Ветчина",
        "UrlImg": "/assets/img/bacon.png",
        "Price": 50,
        "Mass": 40
    },
    {
        "IngredientId": 2,
        "Name": "Шампиньоны",
        "UrlImg": "/assets/img/champig.png",
        "Price": 35,
        "Mass": 40
    },
    {
        "IngredientId": 3,
        "Name": "Красный лук",
        "UrlImg": "/assets/img/onion.png",
        "Price": 30,
        "Mass": 25
    },
    {
        "IngredientId": 4,
        "Name": "Помидоры",
        "UrlImg": "/assets/img/tomato.png",
        "Price": 35,
        "Mass": 50
    },
    {
        "IngredientId": 5,
        "Name": "Ананасы",
        "UrlImg": "/assets/img/pineapples.png",
        "Price": 35,
        "Mass": 50
    },
    {
        "IngredientId": 6,
        "Name": "Огурчик",
        "UrlImg": "/assets/img/cucumber.png",
        "Price": 35,
        "Mass": 50
    },
    {
        "IngredientId": 7,
        "Name": "Чеддер и пармезан",
        "UrlImg": "/assets/img/cheeses.png",
        "Price": 40,
        "Mass": 50
    },
    {
        "IngredientId": 8,
        "Name": "Пепперони",
        "UrlImg": "/assets/img/pepperoni.png",
        "Price": 50,
        "Mass": 40
    }
]

  ngOnInit(): void {

    //if(this.have_been_received) {
      axios.get('http://localhost:1234/ingredients')
      .then((res) => {
      
      this.pizzaService.ingredientArray = JSON.parse(res.headers['ingredients']);
      this.pizzaService.setBoolFalseStartup();

      //заполняем представления
      this.boolArrayView = this.pizzaService.boolArrayServ;
      this.ingreds = this.pizzaService.ingredientArray;

           
      })
      .catch((err: any) => {

        this.pizzaService.ingredientArray = this.ingredsDict;
        this.pizzaService.setBoolFalseStartup();
  

        //заполняем представления
        this.boolArrayView = this.pizzaService.boolArrayServ;
        this.ingreds = this.pizzaService.ingredientArray;
      });
    //}

    
  }
}
