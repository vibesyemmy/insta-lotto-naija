import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';

import { ParseService } from '@lotto-front/shared';
import { Ticket, initTicket } from '@lotto-front/model';
import * as Parse from 'parse';

describe('HomeService', () => {

  let parseService: ParseService;
  let service: HomeService;
  // tslint:disable-next-line:prefer-const
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({})
    parseService = new ParseService();
    service = new HomeService(parseService);
  });

  it('should be created', () => {
    service = TestBed.get(HomeService);
    expect(service).toBeTruthy();
  });

  it('should save new ticket', () => {
    const p = <Parse.Object> {
      get: (key) => {
        switch(key) {
          case 'numbers':
            return '12345';
        }
      }
    };
    spy = spyOn(parseService, 'save').and.returnValue(p)
    const ticket: Ticket = {
      ...initTicket,
      numbers: '12345'
    }
    service.saveTicket(ticket);
    expect(parseService.save).toHaveBeenCalled()
    expect(ticket.numbers).toEqual(p.get('numbers'));
  })
});
