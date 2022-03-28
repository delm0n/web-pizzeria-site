import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { ClientService } from '../../myservices/account/client.service';

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

  autorizationFlugView = false
  firstName = ""

  constructor(private cdref: ChangeDetectorRef, private clientService: ClientService) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.autorizationFlugView = this.clientService.autorizationFlug
    this.firstName = this.clientService.client.firstName
  }

}
