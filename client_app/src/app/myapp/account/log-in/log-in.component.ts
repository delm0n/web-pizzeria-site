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
  
  notExistUser() {
    this.invalidPersonServer = true;
    setTimeout(() =>{
      this.invalidPersonServer = false;
      // this.person.telephone = "",
      // this.person.password = ""
    }, 6000);
  }

  checkedPolicy: boolean = false
  changeCheckedPolicy() {
    this.checkedPolicy = !this.checkedPolicy
  }



  // unvalidTelephone: boolean = false

  constructor(private clientService: ClientService, private router: Router) { }

  logIn() {
    axios.get('http://localhost:1234/log-in/' + this.person.telephone + '&' + this.person.password)
      .then((res) => {
        if(res.data == "Not ok") {
          //если такого пользователя нет
          this.notExistUser();
        }

        else { 
          this.clientService.enterClient(res.data);
          this.router.navigate(['/'])
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

}
