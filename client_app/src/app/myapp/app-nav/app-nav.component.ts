import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { ClientService } from '../../myservices/account/client.service';
import { CartService } from '../../myservices/cart/cart.service'

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
    if(this.cartService.pizzasInCart.length > 0) {
      this.cartContainFlugView = true;
    }
    else {
      this.cartContainFlugView = false;
    }
  }

  constructor(private cdref: ChangeDetectorRef, private clientService: ClientService, 
    private cartService: CartService) { 
    
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
