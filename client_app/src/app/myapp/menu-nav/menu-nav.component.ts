import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/myservices/cart/cart.service';
import { ModalPizzaService } from 'src/app/myservices/modal-pizza/modal-pizza.service';


@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  constructor(private router: Router, private cartService: CartService) {
    
   }

  Pizza: string = "Pizza";
  Snacks: string = "Snacks";
  Rolls: string = "Rolls";
  Desserts: string = "Desserts";
  Drinks: string = "Drinks";


  routing(href: string) {

    let theElement = document.getElementById(href)!;

    if (this.router.url == "/") {
      setTimeout(function () {
        window.scrollTo(0, theElement.getBoundingClientRect().top + scrollY - 20);
      }, 400);
    }
    else {
      this.router.navigate(['/']);

      this.cartService.flugScroll = true;
      this.cartService.setHref(href);
    }
  }

  ngOnInit(): void {
  }

}
