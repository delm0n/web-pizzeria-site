import { Component, OnInit } from '@angular/core';

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

  checkedPolicy: boolean = false
  changeCheckedPolicy() {
    this.checkedPolicy = !this.checkedPolicy
  }

  constructor() { }

  logIn() {
    console.log(this.person, this.checkedPolicy);
  }

  ngOnInit(): void {
  }

}
