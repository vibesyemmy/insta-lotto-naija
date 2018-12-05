import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lotto-front-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.scss']
})
export class HomeToolbarComponent implements OnInit {

  @Input()
  isLoggedIn = false;

  @Output() clickAction = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onActionClick(action: string) {
    this.clickAction.next(action);
  }

}
