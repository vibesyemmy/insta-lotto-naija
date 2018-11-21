import { TestBed } from '@angular/core/testing';

import { UserServiceService } from './user-service.service';
import { Promise } from 'q';

describe('UserServiceService', () => {

  let parseUser: Parse.User;

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
  });

  it('getUser should return null if user is null', () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    parseUser = null;
    service.user = parseUser;
    expect(service.getUser()).toEqual(null);
  });

  it('getUser should return user if user is loggedIn', () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    parseUser = <Parse.User>{
      id: 'abcd',
      getEmail: () => {
        return 'abcd@efgh.com'
      },
      getUsername: () => {
        return 'abcd';
      }
    };
    service.user = parseUser;
    expect(service.getUser().objectId).toEqual(parseUser.id);
    expect(service.getUser().email).toEqual(parseUser.getEmail());
    expect(service.getUser().username).toEqual(parseUser.getUsername());
  });
});
