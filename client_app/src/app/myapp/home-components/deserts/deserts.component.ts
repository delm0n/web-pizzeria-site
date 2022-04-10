import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AddishesClass } from '../../../models/AddishesCLass'

@Component({
  selector: 'app-deserts',
  templateUrl: './deserts.component.html',
  styleUrls: ['./deserts.component.css']
})
export class DesertsComponent implements OnInit {

  deserts:AddishesClass[] = [];

  constructor() { }

  addToCart(index: number) {
  }

  ngOnInit(): void {
    axios.get('http://localhost:1234/desserts')
      .then((res) => {
        this.deserts = JSON.parse(res.headers['desserts']);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
