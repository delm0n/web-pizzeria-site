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
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
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
export class LogInComponent implements OnInit {

  person = {
    telephone: "",
    password: ""
  }

  invalidPersonServer: boolean = false
  
  notExistClient() {
    this.invalidPersonServer = true;
    setTimeout(() =>{
      this.invalidPersonServer = false;
    }, 5000);
  }

  checkedPolicy: boolean = false
  changeCheckedPolicy() {
    this.checkedPolicy = !this.checkedPolicy
  }


  constructor(private clientService: ClientService, private router: Router) { }

  logIn() {

    let token = this.person.telephone + ':' +this.person.password + ':' + new Date().toLocaleDateString();

    axios.get('http://localhost:1234/enter',
    {
      //withCredentials: true,
      params: {
        telephone: this.person.telephone,
        password: this.person.password
      },

      headers: {
        'Authorization':  token,
      }
    })
    .then((res) => {

      if (res.status == 404) {
        this.router.navigate(['/404'])
      }
      
      else {

        if(res.data == "Not") {
          //если такого пользователя нет
          this.notExistClient();
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
    .catch((err) => {
      console.log(err);
    })
  }


  ngOnInit(): void {
  }

}
