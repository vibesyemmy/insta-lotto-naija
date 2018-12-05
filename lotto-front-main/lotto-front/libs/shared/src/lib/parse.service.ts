import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import * as Parse from 'parse';
import { ParseParams } from '@lotto-front/model';

export interface AuthResponse {
  inFlight: boolean;
  error: Error;
}

export interface ForgotPasswordRequest {
  email: string;
}
export interface LoginRequest extends ForgotPasswordRequest {
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  userSubject: Subject<Parse.User> = new Subject();
  authSubject: Subject<AuthResponse> = new Subject();
  userObservable: Observable<Parse.User> = this.userSubject.asObservable();
  authObservable: Observable<AuthResponse> = this.authSubject.asObservable();

  constructor() {
    const params: ParseParams = {
      appId: "abcd",
      serverUrl:  this.getUrl()
    }
    console.log(params);
    Parse.initialize(params.appId);
    Parse.serverURL = params.serverUrl;
    Parse.liveQueryServerURL = "ws://localhost:3030";
  }

  getUser(): Parse.User {
    return Parse.User.current();
  }

  async login(req: LoginRequest) {
    const res: AuthResponse = {
      inFlight: true,
      error: undefined
    };
    this.authSubject.next(res)
    try {
      const user = await Parse.User.logIn(req.email, req.password);
      this.userSubject.next(user);
      this.authSubject.next({
        ...res,
        inFlight: false,
        error: undefined
      });
    } catch (error) {
      this.userSubject.error(error);
      this.authSubject.next({
        ...res,
        inFlight: false,
        error: error
      });
    }
  }

  async signUp(req: RegisterRequest) {
    const user = new Parse.User();
    user.setUsername(req.email);
    user.setPassword(req.password);
    user.setEmail(req.email);
    user.set('phone', req.phone);
    try {
      await user.signUp();
      this.userSubject.next(user);
    } catch (error) {
      this.userSubject.error(error);
      console.error(error);
    }
  }
  async save(obj: Parse.Object) {
    try {
      await obj.save();
      return obj;
    } catch (error) {
      throw error
    }
  }

  getUrl(): string {
    return "http://localhost:3000/api";
  }
}