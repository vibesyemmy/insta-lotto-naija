import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lotto-front-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  balance = 5000;

  constructor() { }

  ngOnInit() {
  }

}
