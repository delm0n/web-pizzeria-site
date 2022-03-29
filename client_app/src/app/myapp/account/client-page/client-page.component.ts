import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ClientService } from '../../../myservices/account/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  active_status = 0;

  client = {
    clientId : 0,
    firstName : "",
    telephone : "",
    password : "",
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

  constructor(private clientService: ClientService, private router: Router) { }

  updateClient(firstname: String, password: String) {  

    if(firstname == "" || password == "") {
      this.emptyError = true;
    }

    else {

      if(this.client.firstName != firstname) {
        axios.put('http://localhost:1234/client-rename/' + this.client.clientId + '&' + firstname)
        .then((res) => {
          this.clientService.enterClient(res.data);
          this.successDone = true;
        })
        .catch((err: any) => {
          console.log(err);
        });
      }

      if(this.client.password != password) {
        axios.put('http://localhost:1234/client-repassword/' + this.client.clientId + '&' + password)
        .then((res) => {
          this.clientService.enterClient(res.data);
          this.successDone = true;
        })
        .catch((err: any) => {
          console.log(err);
        });
      }
    }

  }

  ngOnInit(): void {
    this.client = this.clientService.client;
  }

}
