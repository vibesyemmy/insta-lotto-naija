import { Injectable } from '@angular/core';
import { UserData, map } from '@lotto-front/model';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  user = Parse.User.current();
  constructor() {}

  getUser(): UserData {
    return map(this.user);
  }

  getParseUser(): Parse.User {
    return Parse.User.current();
  }
}
