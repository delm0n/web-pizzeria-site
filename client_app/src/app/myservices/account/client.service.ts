import { Injectable } from '@angular/core';
import { ClientClass } from '../../models/ClientClass';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  autorizationFlug = false;

  

  client:ClientClass  = {
    clientId : 0,
    firstName : "",
    telephone : "",
    password : "",
    pizzaCartJson : ""
  }

  enterClient(entity: any) {

    this.client.clientId = entity["ClientId"];
    this.client.firstName = entity["FirstName"];
    this.client.telephone = entity["Telephone"];
    this.client.password = entity["Password"];
    this.client.pizzaCartJson = entity["PizzaCartJson"];
    
    this.autorizationFlug = true;
  }

  exitClient() {
    this.client = {
      clientId : 0,
      firstName : "",
      telephone : "",
      password : "",
      pizzaCartJson : ""
    }
    this.autorizationFlug = false;
  }

  constructor() { }
}
