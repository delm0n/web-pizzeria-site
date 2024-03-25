import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { DishesCartClass } from 'src/app/models/DishCartClass';
import { DishesClass, TypesEnum } from 'src/app/models/DishClass';
import { ClientService } from 'src/app/myservices/account/client.service';
import { CartService } from 'src/app/myservices/cart/cart.service';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
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
          '1.9s',
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
export class DishesComponent implements OnInit {

  dish_component: DishesClass[] = [];
  dishes_InCartID: number[] = [];

  @Input() typesEnum: number = 0;
  @Input() titleEnum: string = "";

  dictDish  = {
    0: [
      {
          "DishId": 20,
          "Name": "Bon Aqua",
          "UrlImg": "/assets/img/bonaqua.png",
          "Structure": "",
          "Price": 65,
          "Mass": 500,
          "DishType": 0
      },
      {
          "DishId": 17,
          "Name": "Coca-Cola",
          "UrlImg": "/assets/img/cola.png",
          "Structure": "",
          "Price": 85,
          "Mass": 500,
          "DishType": 0
      },
      {
          "DishId": 19,
          "Name": "Fanta",
          "UrlImg": "/assets/img/fanta.png",
          "Structure": "",
          "Price": 85,
          "Mass": 500,
          "DishType": 0
      },
      {
          "DishId": 18,
          "Name": "Sprite",
          "UrlImg": "/assets/img/sprite.png",
          "Structure": "",
          "Price": 85,
          "Mass": 500,
          "DishType": 0
      },
      {
          "DishId": 24,
          "Name": "Сок апельсиновый",
          "UrlImg": "/assets/img/juorange.png",
          "Structure": "",
          "Price": 120,
          "Mass": 1000,
          "DishType": 0
      },
      {
          "DishId": 21,
          "Name": "Сок мультифрукт",
          "UrlImg": "/assets/img/jumul.png",
          "Structure": "",
          "Price": 120,
          "Mass": 1000,
          "DishType": 0
      },
      {
          "DishId": 22,
          "Name": "Сок томатный",
          "UrlImg": "/assets/img/jutomato.png",
          "Structure": "",
          "Price": 120,
          "Mass": 1000,
          "DishType": 0
      },
      {
          "DishId": 23,
          "Name": "Сок яблочный",
          "UrlImg": "/assets/img/juapple.png",
          "Structure": "",
          "Price": 120,
          "Mass": 1000,
          "DishType": 0
      }
  ] ,
  1: [
    {
        "DishId": 26,
        "Name": "Вишневый пирог",
        "UrlImg": "/assets/img/cheesecake_cherr.jpg",
        "Structure": "Это не просто десерт, а вишенка на торте! Творожно-песочное тесто с ягодами, заварным кремом и лепестками миндаля",
        "Price": 95,
        "Mass": 80,
        "DishType": 1
    },
    {
        "DishId": 27,
        "Name": "Сырники",
        "UrlImg": "/assets/img/cheesecakes.png",
        "Structure": "Любимый десерт многих наших гостей — румяные сырники из печи",
        "Price": 140,
        "Mass": 90,
        "DishType": 1
    },
    {
        "DishId": 25,
        "Name": "Чизкейк",
        "UrlImg": "/assets/img/cheesecake.png",
        "Structure": "Мы перепробовали тысячу десертов и наконец нашли любимца гостей — нежнейший творожный чизкейк",
        "Price": 95,
        "Mass": 80,
        "DishType": 1
    },
    {
        "DishId": 29,
        "Name": "Шоколадное печенье",
        "UrlImg": "/assets/img/cookie.jpg",
        "Structure": "Сочетает в себе темный и бельгийский молочный шоколад",
        "Price": 50,
        "Mass": 40,
        "DishType": 1
    },
    {
        "DishId": 28,
        "Name": "Шоколадный маффин",
        "UrlImg": "/assets/img/muffin.jpg",
        "Structure": "Основное блюдо заканчивается, начинаются маффины с начинкой на шоколадной основе",
        "Price": 100,
        "Mass": 140,
        "DishType": 1
    }
],
2: [
  {
      "DishId": 13,
      "Name": "Греческий салат",
      "UrlImg": "/assets/img/greek_salad.jpg",
      "Structure": "Пекинская капуста, сочные томаты, красный лук, свежие огурцы, болгарский перец, сыр брынза, маслины",
      "Price": 195,
      "Mass": 210,
      "DishType": 2
  },
  {
      "DishId": 10,
      "Name": "Картофель Айдахо",
      "UrlImg": "/assets/img/potato.jpg",
      "Structure": "Картофель в кожуре, нарезанный дольками, слегка отваренный и потом запеченный в ароматной смеси из масла, чеснока и трав",
      "Price": 115,
      "Mass": 100,
      "DishType": 2
  },
  {
      "DishId": 11,
      "Name": "Картофель фри",
      "UrlImg": "/assets/img/potato_2.jpg",
      "Structure": "Порция обжаренных в растительном фритюре и слегка посоленных соломок отборного картофеля",
      "Price": 115,
      "Mass": 100,
      "DishType": 2
  },
  {
      "DishId": 12,
      "Name": "Куриные наггетсы",
      "UrlImg": "/assets/img/nuggets.jpg",
      "Structure": "Филе куриной грудки в хрустящей панировке, обжаренной в масле",
      "Price": 150,
      "Mass": 120,
      "DishType": 2
  },
  {
      "DishId": 16,
      "Name": "Паста Карбонара",
      "UrlImg": "/assets/img/pasta_k.jpg",
      "Structure": "Паста, нежная свинина, ароматный бекон, моцарелла, пармезан и сливочный соус",
      "Price": 270,
      "Mass": 300,
      "DishType": 2
  },
  {
      "DishId": 15,
      "Name": "Паста Мюнхенская",
      "UrlImg": "/assets/img/pasta_m.jpg",
      "Structure": "Паста, ароматные мюнхенские колбаски, болгарский перец, моцарелла и фирменный соус",
      "Price": 249,
      "Mass": 290,
      "DishType": 2
  },
  {
      "DishId": 14,
      "Name": "Салат цезарь",
      "UrlImg": "/assets/img/caesar_salad.jpg",
      "Structure": "Пекинская капуста, сочные томаты, грудка куриная копченая, сыр пармезан, сухарики и соус цезарь",
      "Price": 199,
      "Mass": 215,
      "DishType": 2
  }
], 
3: [
  {
      "DishId": 9,
      "Name": "Инь-Янь ",
      "UrlImg": "/assets/img/in_roll.png",
      "Structure": "Лосось слабосолёный, копчёный угорь, свежий огурец, икра масаго, рис и нори",
      "Price": 329,
      "Mass": 190,
      "DishType": 3
  },
  {
      "DishId": 7,
      "Name": "Ойши",
      "UrlImg": "/assets/img/ois_roll.jpg",
      "Structure": "Кальмар, сливочный сыр, лосось слабосоленый, соус Чили манго, кунжут, рис и нори",
      "Price": 290,
      "Mass": 220,
      "DishType": 3
  },
  {
      "DishId": 4,
      "Name": "Окинава",
      "UrlImg": "/assets/img/oki_roll.jpg",
      "Structure": "Сливочный сыр, японский омлет, кунжут, рис и нори",
      "Price": 199,
      "Mass": 220,
      "DishType": 3
  },
  {
      "DishId": 2,
      "Name": "Ролл с лососем",
      "UrlImg": "/assets/img/salm_roll.jpg",
      "Structure": "Лосось слабосолёный, рис и нори",
      "Price": 199,
      "Mass": 115,
      "DishType": 3
  },
  {
      "DishId": 5,
      "Name": "Ролл с угрём",
      "UrlImg": "/assets/img/eel_rool.jpg",
      "Structure": "Копчёный угорь, рис и нори",
      "Price": 219,
      "Mass": 100,
      "DishType": 3
  },
  {
      "DishId": 6,
      "Name": "Сидней",
      "UrlImg": "/assets/img/syd_roll.png",
      "Structure": "Креветка, сливочный сыр, стружка тунца, рис и нори",
      "Price": 199,
      "Mass": 220,
      "DishType": 3
  },
  {
      "DishId": 8,
      "Name": "Токио",
      "UrlImg": "/assets/img/tok_roll.jpg",
      "Structure": "Лосось холодного копчения, огурец свежий, сливочный сыр, икра Масаго, соус токио, рис и нори",
      "Price": 309,
      "Mass": 240,
      "DishType": 3
  },
  {
      "DishId": 3,
      "Name": "Чиби",
      "UrlImg": "/assets/img/chib_roll.png",
      "Structure": "Лосось холодного копчения, икра масаго, свежий огурец, пекинская капуста, соус ширрача, рис и нори",
      "Price": 199,
      "Mass": 170,
      "DishType": 3
  },
  {
      "DishId": 1,
      "Name": "Чиз ролл",
      "UrlImg": "/assets/img/ch_roll.jpg",
      "Structure": "Сливочный сыр, японский омлет, кунжут, рис и нори",
      "Price": 140,
      "Mass": 140,
      "DishType": 3
  }
],
  };

  dish_modal: DishesClass = {
    DishId: 0,
    Name: '',
    UrlImg: '',
    Price: 0,
    Mass: 0,
    Structure: '',
    DishType: TypesEnum.Snacks
  }

  countModal = 1 //количество выбранных пицц
  modal: boolean = true; //флаг на модальное окно
  modalBtn(id: number) {
    this.modal = !this.modal;

    //махинации с прокруткой
    document.body.style.overflow = 'hidden';
    this.dish_modal = this.dish_component.find(d => d.DishId == id)!
  }

  modalBtn_close() {
    this.modal = !this.modal;
    document.body.style.overflow = 'visible';
    this.countModal = 1;

    this.dish_modal = {
      DishId: 0,
      Name: '',
      UrlImg: '',
      Price: 0,
      Mass: 0,
      Structure: '',
      DishType: TypesEnum.Snacks
    }

  }

  decrement() {
    if (this.countModal > 1) {
      this.countModal--;
    }
  }

  increment() {
    if (this.countModal < 11) {
      this.countModal++;
    }
  }

  constructor(private clientService: ClientService, private router: Router,
    private dishesService: DishesService) {
    this.getIdDishInCart();
  }

  getIdDishInCart() {
    for (let i = 0; i < this.dishesService.dishesCart.length; i++) {
      this.dishes_InCartID.push(this.dishesService.dishesCart[i].DishId);
    }
  }

  addToCart(id: number) {

    //при первом добавлении
    if (this.dishesService.dishesCart.find(d => d.DishId == id) == undefined) {
      let dish: DishesCartClass = {
        DishId: id,
        Name: this.dish_modal.Name,
        UrlImg: this.dish_modal.UrlImg,
        Price: this.dish_modal.Price,
        Mass: this.dish_modal.Mass,
        DishType: this.dish_modal.DishType,
        Structure: this.dish_modal.Structure,
        Count: this.countModal
      }

      this.dishesService.dishesCart.push(dish);
      this.getIdDishInCart();

      //при входе в аккаунт
      if (this.clientService.autorizationFlug) {
        this.dishesService.addDishInCartServer(this.clientService.client.clientId)
      }

    }
    else {
      //иначе просто увеличиваем количество
      this.dishesService.dishesCart.find(d => d.DishId == id)!.Count = this.countModal + this.dishesService.dishesCart.find(d => d.DishId == id)!.Count;

      if (this.clientService.autorizationFlug) {
        this.dishesService.CounterDishInCartServer(this.clientService.client.clientId, id, this.dishesService.dishesCart.find(d => d.DishId == id)!.Count)
      }
    }


    // //при входе в аккаунт
    // if(this.clientService.autorizationFlug) {
    //   this.dishesService.addDishInCartServer(this.clientService.client.clientId)
    // }

    this.modalBtn_close();
  }

  axiosBool: boolean = true;
  ngOnInit(): void {

    if (this.axiosBool) {
      setTimeout(() => {
        axios.get('http://localhost:1234/dishes/' + this.typesEnum)
          .then((res) => {

            this.dish_component = JSON.parse(res.headers['dishes']);
            this.axiosBool = false;           
          })
          .catch((err: any) => {
            //@ts-ignore
            this.dish_component =  this.dictDish[this.typesEnum];
            this.axiosBool = false;

          });
      }, 400);
    }

  }

}
