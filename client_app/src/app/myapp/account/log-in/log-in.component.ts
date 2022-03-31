import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Router} from '@angular/router';

import { ClientService } from '../../../myservices/account/client.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
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
    let token = this.person.telephone + ':' +this.person.password
    axios.get('http://localhost:1234/log-in/' + this.person.telephone + '&' + this.person.password,
      {
        headers: {Authorization: token}
      },
    )
      .then((res) => {
        // console.log(res);

        // console.log(JSON.parse(res.headers['data']));
        // console.log(res.headers['authorization']);
        
        if(res.data == "Not ok") {
          //если такого пользователя нет
          this.notExistClient();
        }

        else { 
          if (res.headers['authorization'] == token) {
            this.clientService.enterClient(JSON.parse(res.headers['data']));
            this.router.navigate(['/'])
          }
          else {
            this.router.navigate(['/404'])
          } 
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

}
