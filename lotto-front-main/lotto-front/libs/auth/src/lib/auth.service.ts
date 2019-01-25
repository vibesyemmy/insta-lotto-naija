import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as Parse from 'parse';
import { UserData, map as mapUser } from '@lotto-front/model';
import { map } from 'rxjs/operators';
import { ParseService } from '@lotto-front/shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirectUrl = '/';
  private loginUrl = '/login';
  private isloggedIn = Parse.User.current() !== null;


  isUserAuthenticated(username: string, password: string): Observable<boolean> {
    const promise = Parse.User.logIn(username, password);
    return from(promise).pipe(
      map((user: Parse.User) => user != null)
    );
  }

  signUp(username: string, password: string, phone: string): Observable<boolean> {
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', username);
    user.set('phone', phone);

    const promise = user.save();

    return from(promise).pipe(
      map(() => Parse.User.current() != null)
    );
  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }
  getLoginUrl(): string {
    return this.loginUrl;
  }
  getLoggedInUser(): UserData {
    return mapUser(Parse.User.current());
  }

  logoout() {
    Parse.User.logOut().then(() => location.href = this.redirectUrl)
      .cathch((err: Parse.Error) => console.error(err));
  }

  redirect() {
    location.href = this.redirectUrl;
  }

  getCurrentUser(): UserData {
    return mapUser(Parse.User.current())
  }
  constructor(parseService: ParseService) { }
}
