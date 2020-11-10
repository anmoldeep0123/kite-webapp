import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-broker-url',
  templateUrl: './broker-url.component.html',
  styleUrls: ['./broker-url.component.scss']
})
export class BrokerUrlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.location.href = ('https://kite.zerodha.com/connect/login?v=3&api_key=6o1xtbz3t0u1dg6i');
  }

}
