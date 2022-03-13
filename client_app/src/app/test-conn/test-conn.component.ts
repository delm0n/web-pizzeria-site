import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-test-conn',
  templateUrl: './test-conn.component.html',
  styleUrls: ['./test-conn.component.css']
})
export class TestConnComponent implements OnInit {

  testStr = ""
  pizzas = [{
    pizzaId: null,
    name: ""
  }]

  constructor() { }

  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  ngOnInit(): void {
    axios.get('http://localhost:1234/testconn')
      .then((res) => {
        this.pizzas = res.data;
        console.log(this.pizzas);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
