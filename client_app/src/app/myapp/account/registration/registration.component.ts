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
    password: "",
    password_confirm: ""
  }

  invalidPersonServer: boolean = false
  existTelClient() {
    this.invalidPersonServer = true;
    setTimeout(() =>{
      this.invalidPersonServer = false;;
    }, 6000);
  }

  checkedPolicy: boolean = false
  changeCheckedPolicy() {
    this.checkedPolicy = !this.checkedPolicy
  }

  constructor(private clientService: ClientService, private router: Router) { }

  registration() {

    let token = this.person.telephone + ':' + this.person.password + ':' + new Date().toLocaleDateString();
    
    axios.post('http://localhost:1234/registration', 
    {
      Telephone: this.person.telephone,
      Password: this.person.password,
      FirstName: this.person.firstName,
    },
    {    

      headers: {
        'Authorization':  token,
      }
    })
    .then(res => {

      if (res.status == 404) {
        this.router.navigate(['/404'])
      }
      
      else {

        if(res.data == "Not") {
          //если такого пользователя нет
          this.existTelClient();
        }

        else {
          //проверяем на совпадение токенов
          if(res.headers["authorization"] == token) {
            
            this.clientService.enterClient(JSON.parse(res.headers["client"]));
            this.router.navigate(['/'])

          }

          else { //если не совпадает
            this.router.navigate(['/404'])
          }
        } 
      }

    })
    .catch(errors => console.log(errors));
  }

  ngOnInit(): void {
  }

}
