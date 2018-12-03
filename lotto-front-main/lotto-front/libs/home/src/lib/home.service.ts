import { Injectable } from '@angular/core';
import { ParseService } from '@lotto-front/shared';
import { Ticket, ParseTicket, AppError } from '@lotto-front/model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeState, initHomeState } from './number-picker/home.state';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  homeStateSubject: Subject<HomeState> = new Subject();
  homeStateObservable = this.homeStateSubject.asObservable();

  homeErrorsSubject: Subject<string> = new Subject();
  homeErrorsObservable: Observable<AppError> = this.homeErrorsSubject.asObservable().pipe(
    map(e => <AppError>{
      message: e,
      severity: 1
    })
  );

  constructor(private parseService: ParseService) { }

  saveTicket(ticket: Ticket) {
    const parseTicket = new ParseTicket();
    parseTicket.set('numbers', ticket.numbers);
    this.homeStateSubject.next({
      ...initHomeState,
      number: ticket.numbers,
      isLoading: true
    })
    try {
      this.parseService.save(parseTicket);
    } catch (error) {
      this.homeErrorsSubject.next(error.message);
    }
  }
}
