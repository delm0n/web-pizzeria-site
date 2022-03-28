import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Router} from '@angular/router';

import { ClientService } from '../../../myservices/account/client.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  person = {
    firstName: "",
    telephone: "",
    password: "",
    password_confirm: ""
  }

  invalidPersonServer: boolean = false
  existTelUser() {
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
    axios.post('http://localhost:1234/regist/'+ this.person.firstName + '&' + this.person.telephone + '&' + this.person.password)
      .then((res) => {
        if(res.data == "Not ok") {
          //если такой номер телефона уже есть
          this.existTelUser();
        }

        else { 

            this.clientService.enterClient(res.data);
            this.router.navigate(['/']);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

}
