import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { md5 } from '../avatar.helper';

export interface Avatar {
  email: string;
}

export const initAvatar: Avatar = {
  email: 'verygreenboi@live.com'
}

@Component({
  selector: 'lotto-front-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.scss']
})
export class HomeToolbarComponent implements OnInit {

  @Input()
  isLoggedIn = false;

  @Input()
  avatar: Avatar = initAvatar

  @Input()
  walletBalance = 5000;

  @Output() clickAction = new EventEmitter<string>();

  avatarUrl = `https://www.gravatar.com/avatar/${md5(this.avatar.email)}?s=52&d=identicon`

  constructor() { }

  ngOnInit() {
  }

  onActionClick(action: string) {
    this.clickAction.next(action);
  }

}
