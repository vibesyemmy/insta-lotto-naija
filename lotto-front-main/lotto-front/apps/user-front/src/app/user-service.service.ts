import { Injectable } from '@angular/core';
import { UserData, map as Map } from '@lotto-front/model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ParseService } from './parse-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userObservable: Observable<UserData> = this.parseService.userObservable.pipe(
    map(u => Map(u))
  )

  constructor(private parseService: ParseService) {}

  getUser(): UserData {
    const user = this.parseService.getUser();
    return Map(user);
  }

  login(username: string, password: string) {
    if (username === '' || username === undefined || password === '' || password  === undefined) {
      this.parseService.userSubject.error(new Error('Username or password is invalid.'));
      return;
    }
    this.parseService.login(username, password);
  }
  signUp(username: string, password: string, email: string, phone: string) {
    if (
        username === '' || username === undefined ||
        password === '' || password  === undefined ||
        email === '' || email  === undefined ||
        phone === '' || phone  === undefined
      ) {
      this.parseService.userSubject.error(new Error('Please ensure that you have entered the correct informtion..'));
      return;
    }
    this.parseService.signUp(username, password, email, phone);
  }
}
