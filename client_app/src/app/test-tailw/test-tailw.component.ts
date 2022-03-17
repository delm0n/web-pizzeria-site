import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-tailw',
  templateUrl: './test-tailw.component.html',
  styleUrls: ['./test-tailw.component.css']
})
export class TestTailwComponent implements OnInit {

  constructor() { }

  modalFlug = false

  toggleClick() {
    if (this.modalFlug === true) {
      this.modalFlug = false;
    }
    else this.modalFlug = true
  }

  ngOnInit(): void {
  }

}
