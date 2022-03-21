import { Component, ChangeDetectorRef, AfterContentChecked, AfterContentInit } from '@angular/core';

import { ModalPizzaService } from './modal-pizza.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked  {
  title = 'client_app';

  constructor(private pizzaService: ModalPizzaService, private cdref: ChangeDetectorRef ) {}

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  
}
