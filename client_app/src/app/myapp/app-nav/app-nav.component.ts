import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {

  hamburgerOpen = false;

  toggleHamburger(): void {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
