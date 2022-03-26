import { Component, OnInit } from '@angular/core';

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

  checkedPolicy: boolean = false
  changeCheckedPolicy() {
    this.checkedPolicy = !this.checkedPolicy
  }

  constructor() { }

  logIn() {
    console.log(this.person);
  }

  ngOnInit(): void {
  }

}
