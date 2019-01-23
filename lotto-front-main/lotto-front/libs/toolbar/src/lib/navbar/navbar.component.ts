import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '@lotto-front/wallet';
import { md5 } from '@lotto-front/shared';

export interface Avatar {
  email: string;
}

export const initAvatar: Avatar = {
  email: 'verygreenboi@live.com'
}

@Component({
  selector: 'lotto-front-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  wallet$: Observable<Wallet>;

  @Input()
  isLoggedIn = false;

  @Input()
  avatar = ''

  @Output() clickAction = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
  }

  onActionClick(action: string) {
    this.clickAction.next(action);
  }

}
