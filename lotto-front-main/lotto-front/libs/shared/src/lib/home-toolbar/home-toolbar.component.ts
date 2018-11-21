import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lotto-front-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.css']
})
export class HomeToolbarComponent implements OnInit {

  @Input()
  isLoggedIn = false;

  constructor() { }

  ngOnInit() {
  }

}
