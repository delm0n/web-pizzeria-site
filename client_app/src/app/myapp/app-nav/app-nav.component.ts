import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';
import { ClientService } from '../../myservices/account/client.service';
import { CartService } from '../../myservices/cart/cart.service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit, AfterContentChecked {

  hamburgerOpen = false;

  toggleHamburger(): void {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  cartContainFlugView: boolean = false

  autorizationFlugView = false
  firstName = ""

  checkContainCart() {
    if(this.cartService.pizzasInCart.length > 0 || this.dishesService.dishesCart.length > 0) {
      this.cartContainFlugView = true;
    }
    else {
      this.cartContainFlugView = false;
    }
  }

  constructor(private cdref: ChangeDetectorRef, private clientService: ClientService, 
    private cartService: CartService, private dishesService: DishesService, private router: Router) { 
    
  }


  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.autorizationFlugView = this.clientService.autorizationFlug;
    this.firstName = this.clientService.client.firstName;
    this.checkContainCart()
  }

}
