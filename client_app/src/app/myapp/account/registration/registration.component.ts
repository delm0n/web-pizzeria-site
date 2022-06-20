import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Router} from '@angular/router';

import { ClientService } from '../../../myservices/account/client.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
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
export class RegistrationComponent implements OnInit {

  person = {
    firstName: "",
    telephone: "",
    email: "",
    password: "",
    password_confirm: ""
  }

  invalidPersonTel: boolean = false
  existTelClient() {
    this.invalidPersonTel = true;
    setTimeout(() =>{
      this.invalidPersonTel = false;;
    }, 6000);
  }

  invalidPersonEmail: boolean = false
  existEmClient() {
    this.invalidPersonEmail = true;
    setTimeout(() =>{
      this.invalidPersonEmail = false;;
    }, 6000);
  }

  checkedPolicy: boolean = false
  changeCheckedPolicy() {
    this.checkedPolicy = !this.checkedPolicy
  }

  constructor(private clientService: ClientService, private router: Router) { }

  registration() {
    
    axios.post('http://localhost:1234/registr', 
    {  
      Telephone: this.person.telephone,
      Password: this.person.password,
      FirstName: this.person.firstName,
      Email: this.person.email
    },
    )
    .then(res => {

        if(res.data == "Tel") {
          //если такого пользователя нет
          this.existTelClient();
        }

        else {

          if(res.data == "Em") {
            this.existEmClient();
          }
          
          else { 
            sessionStorage.setItem('token', res.headers["token"]);
            this.clientService.registClient(JSON.parse(res.headers["client"]));
            this.router.navigate(['/']);
            
          }
        } 
      }

    )
    .catch(errors => this.router.navigate(['/404']));
  }

  ngOnInit(): void {
  }

}
