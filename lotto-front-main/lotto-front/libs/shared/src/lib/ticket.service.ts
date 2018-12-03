import { Injectable } from '@angular/core';
import { Ticket, ParseTicket, ticketMapper, initTicketResponse, TicketResponse } from '@lotto-front/model';
import * as Parse from 'parse';
import { Subject, Observable, of } from 'rxjs';
import { startWith, map, onErrorResumeNext } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  recentTickets: Ticket[] = [];
  readonly recent: Subject<Ticket[]> = new Subject();
  readonly recentObservable: Observable<TicketResponse> = this.recent.asObservable().pipe(
    startWith(initTicketResponse),
    map((res: Ticket[]) => {
      const r: TicketResponse = {
        ...initTicketResponse,
        tickets: res,
        isLoading: false
      }
      return r;
    })
  );

  recentWinningTickets: Ticket[] = [];

  constructor() {
    this.getRecentTickets();
  }

  async getRecentTickets() {
    const rQuery = new Parse.Query(ParseTicket);
    try {
      const tickets: Parse.Object[] = await rQuery.find();
      for (const i of tickets) {
        const tx = ticketMapper.map(i);
        this.recentTickets = [
          ...this.recentTickets,
          tx
        ]
      }
      this.recent.next(this.recentTickets);
    } catch (error) {
      this.recent.error(error);
    }

  }
}
