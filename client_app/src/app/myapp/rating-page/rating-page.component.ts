import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { PizzaClass } from 'src/app/models/PizzaClass';
import { ClientService } from 'src/app/myservices/account/client.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { WebsocketBuilder } from 'websocket-ts/lib/websocketBuilder';

@Component({
  selector: 'app-rating-page',
  templateUrl: './rating-page.component.html',
  styleUrls: ['./rating-page.component.css']
})
export class RatingPageComponent implements OnInit {

  idPizzas: number[] = [];
  pizzaRate: PizzaClass[] = [];
  pizzaRate_socket: PizzaClass[] = [];
  selectedRate: number[] = [];

  constructor(private clientService: ClientService, private router: Router, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = false;
  }


  ws = new WebsocketBuilder('ws://127.0.0.1:7890/PizzaRatingWebsocket?' + sessionStorage.getItem('token')!)
    .onOpen((ws, e) => {  })
    .onClose((ws, e) => {  })
    .onError((ws, e) => {  })
    .onMessage((ws, e) => { 

      if (this.clientService.autorizationFlug) {

        //получаю id заказанных без повторок (можно сделать лучше)
        for (let i = 0; i < this.clientService.orders.length; i++) {
          for (let j = 0; j < this.clientService.orders[i].PizzaIdJson.length; j++) {
            this.idPizzas.push(this.clientService.orders[i].PizzaIdJson[j]);
          }
        }
        this.idPizzas = this.idPizzas.filter((element, index) => {
          return this.idPizzas.indexOf(element) === index;
        });

        //хранит в себе с сокета все пиццы
        this.pizzaRate_socket = JSON.parse(e.data);
        this.pizzaRate = [];
        for (let i = 0; i < this.idPizzas.length; i++) {
          this.pizzaRate.push(this.pizzaRate_socket.find(p => p.PizzaId === this.idPizzas[i])!);
        }
      }

      else {
        this.ws.close();
        this.pizzaRate = [];
      }
    })
    .build();


  changeRate(pizzaId: number, index: number) {

    this.ws.send(JSON.stringify({
      ClientId: this.clientService.client.clientId,
      PizzaId: pizzaId,
      Rating: this.pizzaRate.find(p => p.PizzaId == pizzaId)!.Rating
    }));
  }

  ngOnDestroy(): void {
    //console.log("destroy hook");
    this.ws.close();
  }


  ngOnInit(): void {
  }
}

