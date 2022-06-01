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

  btnClick() {
    axios.get('http://localhost:1234/email')
      .then((res) => {
        console.log(res.status);

      })
      .catch((err) => {
        console.log(err);

      })

  }

  notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Андрей Чернышёв", {
        tag: "ache-mail",
        body: "Привет, высылаю материалы по проекту...",
        //icon : "../../assets/img/icons8-italian-pizza-16.png"
      });
      console.log("Hi there!");
      //Notification.caller();

    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }
  }

  sendExel() {
    axios.get('http://localhost:1234/exelorder')
      .then((res) => {
        console.log(res.status);

      })
      .catch((err) => {
        console.log(err);

      })
  }

  

  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  ngOnInit(): void {

  }
}
