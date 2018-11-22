import { TestBed } from '@angular/core/testing';
import * as Parse from 'parse';
import { UserServiceService } from './user-service.service';
import { ParseService } from './parse-service.service';

describe('UserServiceService', () => {

  let parseUser: Parse.User;
  let parseService: ParseService;
  let service: UserServiceService;
  let spy: any;
  let username: string;
  let password: string;

  beforeEach(() => {
    TestBed.configureTestingModule({})
    parseService = new ParseService();
    service = new UserServiceService(parseService);
  });

  it('getUser should return null if user is null', () => {
    parseUser = null;
    spy = spyOn(parseService, 'getUser').and.returnValue(parseUser);
    expect(service.getUser()).toBeNull();
    expect(parseService.getUser).toHaveBeenCalled();
  });

  it('getUser should return user if user is loggedIn', () => {
    parseUser = <Parse.User>{
      id: 'abcd',
      getEmail: () => {
        return 'abcd@efgh.com'
      },
      getUsername: () => {
        return 'abcd';
      }
    };

    spy = spyOn(parseService, 'getUser').and.returnValue(parseUser);

    expect(service.getUser().objectId).toEqual(parseUser.id);
    expect(service.getUser().email).toEqual(parseUser.getEmail());
    expect(service.getUser().username).toEqual(parseUser.getUsername());
    expect(parseService.getUser).toHaveBeenCalled();
  });

  it('login should fail if username is not valid', () => {
    spy = spyOn(parseService, 'login');
    username = '';
    password = 'xcscs';
    parseService.userSubject.error(new Error());

    service.login(username, password);

    expect(parseService.login).not.toHaveBeenCalled()
  });

  it('login should fail if username is undefined', () => {
    spy = spyOn(parseService, 'login');
    username = undefined;
    password = 'xcscs';
    parseService.userSubject.error(new Error());

    service.login(username, password);

    expect(parseService.login).not.toHaveBeenCalled()
  });

  it('login should fail if password is not valid', () => {
    spy = spyOn(parseService, 'login');
    username = 'asasnjn';
    password = '';
    parseService.userSubject.error(new Error());

    service.login(username, password);

    expect(parseService.login).not.toHaveBeenCalled()
  });

  it('login should fail if password is undefined', () => {
    spy = spyOn(parseService, 'login');
    username = 'cdcnc';
    password = undefined;
    parseService.userSubject.error(new Error());

    service.login(username, password);

    expect(parseService.login).not.toHaveBeenCalled()
  });

  it('login should fail if username or password is not valid', () => {
    spy = spyOn(parseService, 'login');
    username = 'abcd';
    password = 'abcd';

    parseUser = <Parse.User>{
      id: 'abcd',
      getEmail: () => {
        return 'abcd@efgh.com'
      },
      getUsername: () => {
        return 'abcd';
      }
    };

    parseService.userSubject.next(parseUser);

    service.login(username, password);

    expect(parseService.login).toHaveBeenCalled()
  });

  it('signUp should fail if user credential is not valid', () => {
    spy = spyOn(parseService, 'signUp');
    username = 'abcd';
    password = 'abcd';
    const email = '';
    const phone = ''

    parseService.userSubject.error(new Error());

    service.signUp(username, password, email, phone);

    expect(parseService.signUp).not.toHaveBeenCalled()
  });
});
