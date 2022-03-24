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
      state('block', style({
        //..
      })),
      state('hidden', style({
        opacity: 0,
      })),

      transition('block => hidden', [
        animate('0s')
      ]),
      transition('hidden => block', [
        animate(
          '1s',
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
    minPrice: 0,
  }]

  modalPizzas = {
    pizzaId: null,
    pizzaName: "",
    urlImg: "",
    structure: "",
    sizes: [{
      pizzaSizeId: null,
      nameSize : "", //имя размера
      price: 0,
      mass: 0
    },
    {
      pizzaSizeId: null,
      nameSize : "", //имя размера
      price: 0,
      mass: 0
    },
    {
      pizzaSizeId: null,
      nameSize : "", //имя размера
      price: 0,
      mass: 0
    }
  ]}
  
  active_status = 0 //выбранный размер
  countModal = 1 //количество выбранных пицц
  modal: boolean = true; //флаг на модальное окно
  
  modalBtn(){
     
    this.modal=!this.modal;
    this.countModal = 1 //устанавливаем количество выбранных на 1
    this.active_status = 0; //устанавливаем на маленький размер

    this.pizzaService.clearPrice(); //очищаем добавленные ингредиенты с предыдущего модального окна

    //махинации с прокруткой
    if ( document.body.style.overflow == 'hidden') { 
      document.body.style.overflow = 'visible';
      document.getElementById('modalNotMobile')!.style.overflow = 'visible';
      document.getElementById('modalMobile')!.style.overflow = 'visible';
    } else {
      document.body.style.overflow = 'hidden';   
      if(document.body.clientWidth > 639) {
        document.getElementById('modalNotMobile')!.style.overflow = 'auto';
      }
      else {
        document.getElementById('modalMobile')!.style.overflow = 'auto';
      }
    }
    
    //размечаем пустой класс
    this.modalPizzas = {pizzaId: null, 
      pizzaName: "",
      urlImg: "",
      structure: "",
      sizes: [{
        pizzaSizeId: null,
        nameSize : "", //имя размера
        price: 0,
        mass: 0
      },
      {
        pizzaSizeId: null,
        nameSize : "", //имя размера
        price: 0,
        mass: 0
      },
      {
        pizzaSizeId: null,
        nameSize : "", //имя размера
        price: 0,
        mass: 0
      }
    ]};
  }
  
  openPizzaModal(i: any, i_name: string, i_url: string, i_struct: string) {
    axios.get('http://localhost:1234//sizeofasync/'+i)
      .then((res) => {

        this.pizzaService.setBooler_step();
        this.plusIngrPrice = this.pizzaService.priceOfIngreds

        this.modalPizzas.pizzaId = i;
        this.modalPizzas.pizzaName = i_name;
        this.modalPizzas.urlImg = i_url;
        this.modalPizzas.structure = i_struct;
        this.modalPizzas.sizes = res.data;     
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  plusIngrPrice: number = 0
  constructor(private pizzaService: ModalPizzaService) { }

  checkIngredients() { //в переменную, отвечающую за демонстрацию, 
    //присваиваем актуальное значение цены за дополнительные ингредиенты
    this.plusIngrPrice = this.pizzaService.priceOfIngreds
  }
 
  
  decrement(active: number) {
    if (this.countModal > 1) {
      this.countModal--;    
    } 
  }
        

  increment(active: number) {
    this.countModal++;
  }


  
  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  ngOnInit(): void {
    axios.get('http://localhost:1234/pizza')
      .then((res) => {
        this.pizzas = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

}


