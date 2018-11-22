import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  userSubject: Subject<Parse.User> = new Subject();
  userObservable: Observable<Parse.User> = this.userSubject.asObservable()

  constructor() { }

  getUser(): Parse.User {
    return Parse.User.current();
  }

  async login(username: string, password: string) {
    try {
      const user = await Parse.User.logIn(username, password);
      this.userSubject.next(user);
    } catch (error) {
      this.userSubject.next(error);
      console.error(error)
    }
  }

  async signUp(username:string, password:string, email:string, phone:string) {
    const user = new Parse.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    user.set('phone', phone);
    try {
      await user.signUp();
      this.userSubject.next(user);
    } catch (error) {
      this.userSubject.error(error);
      console.error(error);
    }
  }
}
