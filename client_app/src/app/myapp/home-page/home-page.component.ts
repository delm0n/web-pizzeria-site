import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  Drinks = 0;
  DrinksTitle = "Напитки"

  Desserts = 1;
  DessertsTitle = "Десерты"

  Snacks = 2;
  SnacksTitle = "Закуски"

  Rolls = 3;
  RollsTitle = "Роллы"
  
  ngOnInit(): void {
  }

}