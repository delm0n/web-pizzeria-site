import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ClientService } from '../../../myservices/account/client.service';
import {Router} from '@angular/router';

import { ClientClass } from '../../../models/ClientClass'

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
  animations: [
    trigger(
    'alertsAnimation', [

      transition(
        ':enter', 
        [
          style({ height: 0, opacity: 0 }),
          animate('0.4s ease-out', 
                  style({ height: 40, opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({ height: 40, opacity: 1, display: 'none' }),
          animate('0s ease-out', 
                  style({ height: 0, opacity: 0 }))
        ]
      )

    ]
    )
  ]
})
export class ClientPageComponent implements OnInit {

  active_status = 0;

  client: ClientClass = {
    clientId : 0,
    firstName : "",
    telephone : "",
    password : "",
    pizzaCartJson : ""
  }

  emptyError : boolean = false;
  successDone : boolean = false;
    
  hide : boolean = true;
  eyeFunction() {
    this.hide = !this.hide;
  }

  exitUser() {
    this.clientService.exitClient();
    this.router.navigate(['/log-in'])
  }

  doneChange() {
    this.successDone = true;;
    setTimeout(() =>{
      this.successDone = false;
    }, 6000);
  }

  constructor(private clientService: ClientService, private router: Router) { }

  updateClient(firstname: String, password: String, id: number) {  
    let token = this.client.telephone + ':' +this.client.password

    if(firstname == "" || password == "") {
      this.emptyError = true;
    }

    else {
      console.log(firstname, password, id);
      let token = this.client.telephone + ':' + this.client.password + ':' + new Date().toLocaleDateString();

      axios.get('http://localhost:1234/client-re',
      {
        params: {
          ClientId: id,
          Firstname: firstname,
          Password: password,
        }, 
        headers: {
          'Authorization': token
        }
      })
      .then((res) => {
        if (res.status == 404) {
          this.router.navigate(['/404'])
        }
        
        else {
          if(res.data == "Not") {
            this.router.navigate(['/404'])
          }
  
          else {
              //проверяем на совпадение токенов
            if(res.headers["authorization"] == token) {
              console.log("Совпадение токенов");
              
              this.clientService.enterClient(JSON.parse(res.headers["client"]));
            }
            else { //если не совпадает
              this.router.navigate(['/404'])
            }
          }
        }
        
      })
      .catch((err) => {
        console.log(err);       
      })

    }
  }

  ngOnInit(): void {
    this.client = this.clientService.client;   
  }

}
