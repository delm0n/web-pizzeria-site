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

  doneChange() {
    this.successDone = true;;
    setTimeout(() =>{
      this.successDone = false;
    }, 5000);
  }

  constructor(private clientService: ClientService, private router: Router) { }

  updateClient(firstname: String, password: String) {  
    let token = this.client.telephone + ':' +this.client.password
    if(firstname == "" || password == "") {
      this.emptyError = true;
    }

    else {

      if(this.client.firstName != firstname) {
        axios.get('http://localhost:1234/client-rename/' + this.client.clientId + '&' + firstname,
        {
          headers: {Authorization: token}
        },
      )
        .then((res) => {
          if (res.headers['authorization'] == token) {
            this.clientService.enterClient(JSON.parse(res.headers['data']));
            this.doneChange()
          }
          else {
            this.router.navigate(['/404'])
          } 
        })
        .catch((err: any) => {
          console.log(err);
        });
      }

      if(this.client.password != password) {
        axios.get('http://localhost:1234/client-repassword/' + this.client.clientId + '&' + password,
        {
          headers: {Authorization: token}
        },
      )
        .then((res) => {

          if (res.headers['authorization'] == token) {
            this.clientService.enterClient(JSON.parse(res.headers['data']));
            this.doneChange()
          }
          else {
            this.router.navigate(['/404'])
          } 
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
