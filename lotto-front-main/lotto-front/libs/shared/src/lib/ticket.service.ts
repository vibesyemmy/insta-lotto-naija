import { Injectable } from '@angular/core';
import { Ticket, ParseTicket, ticketMapper, initTicketResponse, TicketResponse } from '@lotto-front/model';
import * as Parse from 'parse';
import { Subject, Observable, of } from 'rxjs';
import { startWith, map, onErrorResumeNext } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr: ToastrService) {}

  initialize() {
    this.getRecentTickets();
    this.subscribeToRecentTickets();
  }

  async getRecentTickets() {
    const rQuery = new Parse.Query(ParseTicket);
    rQuery.equalTo('paid', true);
    rQuery.limit(3);
    rQuery.descending("createdAt");
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

  subscribeToRecentTickets() {
    const rQuery = new Parse.Query(ParseTicket);
    rQuery.equalTo('paid', true);
    const subscription = rQuery.subscribe();

    subscription.on('create', (ticket) => {
      const tx = ticketMapper.map(ticket);
      if (this.recentTickets.length > 2) {
        this.recentTickets.pop()
      }
      this.recentTickets.unshift(tx);
      this.recent.next(this.recentTickets);
    });

    subscription.on('error', (error) => {
      console.log(error);
      // this.toastr.error('Please check your connection or login.',"Oops!", {
      //   closeButton: true,
      //   positionClass: 'toast-top-center',
      //   timeOut: 10000
      // });
    });
  }

  async buyTicket(num: string | number) {
    if (isNaN(Number(num.toString()))) {
      this.toastr.error("Ticket number is invalid.","Oops!", {
        closeButton: true,
        positionClass: 'toast-top-center'
      });
    } else {
      try {
        const ticket = new ParseTicket();
        ticket.set('number', num);
        await ticket.save()
        this.toastr.success("Ticket purchased.","Done!", {
          closeButton: true,
          positionClass: 'toast-top-center'
        });
      } catch (error) {
        this.toastr.error(error.message,"Oops!", {
          closeButton: true,
          positionClass: 'toast-top-center'
        });
      }
    }
  }
}
