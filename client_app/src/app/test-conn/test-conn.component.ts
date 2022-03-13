import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-test-conn',
  templateUrl: './test-conn.component.html',
  styleUrls: ['./test-conn.component.css']
})
export class TestConnComponent implements OnInit {

  testStr = ""

  constructor() { }

  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  ngOnInit(): void {
    axios.get('http://localhost:1234/testconn')
      .then((res) => {
        this.testStr = res.data;
        console.log(this.testStr);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
