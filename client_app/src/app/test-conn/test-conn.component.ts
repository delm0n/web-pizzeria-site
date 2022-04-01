import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ClientClass } from '../models/ClientClass'

@Component({
  selector: 'app-test-conn',
  templateUrl: './test-conn.component.html',
  styleUrls: ['./test-conn.component.css'],
  providers: []
})
export class TestConnComponent implements OnInit {

  constructor() { }

  client: ClientClass = {
    clientId: 0,
    firstName: '',
    telephone: '',
    password: '',
    pizzaCartJson: ''
  }

  form = {
    telephone: '',
    password: ''  
  }

  btnClick() {
    let token = this.form.telephone + ':' +this.form.password + ':' + new Date().toLocaleDateString();

    axios.get('http://localhost:1234/test',
    {
      //withCredentials: true,
      params: {
        telephone: this.form.telephone,
        password: this.form.password
      },

      headers: {
        'Authorization':  token,
      }
    })
    .then((res) => {
      console.log(res);
      
    })
    .catch((err) => {
      console.log(err);
      
    })
    
  }
  
  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  ngOnInit(): void {

  }
}
