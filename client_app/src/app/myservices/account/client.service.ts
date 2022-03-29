import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  autorizationFlug = false;

  client = {
    clientId : 0,
    firstName : "",
    telephone : "",
    password : "",
  }

  enterClient(entity: any) {
    this.client = entity;
    this.autorizationFlug = true;
  }

  exitClient() {
    this.client = {
      clientId : 0,
      firstName : "",
      telephone : "",
      password : "",
    }
    this.autorizationFlug = false;
  }

  constructor() { }
}
