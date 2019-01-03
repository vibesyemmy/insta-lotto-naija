import { Injectable } from '@angular/core';
import { Ticket, ParseTicket, ticketMapper, initTicketResponse, TicketResponse, TicketsPaged } from '@lotto-front/model';
import * as Parse from 'parse';
import { Subject, Observable, of } from 'rxjs';
import { startWith, map, onErrorResumeNext, flatMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  recentTickets: Ticket[] = [];
  myTicketsPaged: TicketsPaged;

  readonly recent: Subject<Ticket[]> = new Subject();
  readonly myTickets: Subject<TicketResponse> = new Subject();
  readonly myTicketsCount: Subject<number> = new Subject();
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

  readonly myTicketsObservable: Observable<TicketResponse> = this.myTickets.asObservable().pipe(
    startWith(initTicketResponse)
  );

  readonly myTicketsCountObservable: Observable<number> = this.myTicketsCount.asObservable().pipe(
    startWith(0)
  );

  private boughtTicketSubject: Subject<Ticket> = new Subject();
  readonly boughtTicketObservable: Observable<Ticket> = this.boughtTicketSubject.asObservable();

  recentWinningTickets: Ticket[] = [];
  subscription: any;

  constructor(private toastr: ToastrService) {}

  initialize() {
    this.getRecentTickets();
    this.subscribeToRecentTickets();
  }

  async getMyTicketsCount() {
    const rQuery = new Parse.Query(ParseTicket);
    rQuery.equalTo('player', Parse.User.current());
    let count = 0;
    try {
      count = await rQuery.count();
      this.myTicketsCount.next(count);
    } catch (error) {
      console.error(error);
    }
  }

  async getMyTicketsPaginated(page: number) {
    const limit = 9;
    const skip = (page - 1) * limit;
    const rQuery = new Parse.Query(ParseTicket);
    rQuery.equalTo('player', Parse.User.current());
    rQuery.descending("createdAt");
    rQuery.limit(limit);
    rQuery.skip(skip);
    try {
      const tickets: Parse.Object[] = await rQuery.find();
      const tx = [];
      for (const t of tickets) {
        tx.push(ticketMapper.map(t))
      }
      const res: TicketResponse = {
        tickets: tx,
        isLoading: false
      }
      this.myTickets.next(res);
    } catch (error) {
      this.myTickets.next({
        tickets: [],
        isLoading: false,
        error: error
      })
    }
  }

  async getRecentTickets() {
    const rQuery = new Parse.Query(ParseTicket);
    rQuery.equalTo('paid', true);
    rQuery.limit(3);
    rQuery.descending("createdAt");
    try {
      const tickets: Parse.Object[] = await rQuery.find();
      for (const t of tickets) {
        const tx = ticketMapper.map(t);
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

  addToTickets(ticket: Ticket) {
    if (this.recentTickets.length > 2) {
      this.recentTickets.pop()
    }
    this.recentTickets.unshift(ticket);
    this.recent.next(this.recentTickets);
  }

  removeFromTickets(ticket: Ticket) {
    const txs: Ticket[] = []
    for (const t of this.recentTickets) {
      if (t.objectId !== ticket.objectId) {
        txs.push(t)
      }
    }
    this.recentTickets = txs;
    this.recent.next(this.recentTickets);
  }

  subscribeToRecentTickets() {
    const rQuery = new Parse.Query(ParseTicket);
    rQuery.equalTo('paid', true);
    this.subscription = rQuery.subscribe();

    this.subscription.on('create', (ticket: Parse.Object) => {
      this.addToTickets(ticketMapper.map(ticket));
    });

    this.subscription.on('enter', (ticket: Parse.Object) => {
      this.addToTickets(ticketMapper.map(ticket));
    });

    this.subscription.on('leave', (ticket: Parse.Object) => {
      this.removeFromTickets(ticketMapper.map(ticket));
    });

    this.subscription.on('delete', (ticket: Parse.Object) => {
      this.removeFromTickets(ticketMapper.map(ticket));
    });

    this.subscription.on('error', (error: Parse.Error) => {
      console.error(error);
      // this.toastr.error('Please check your connection or login.',"Oops!", {
      //   closeButton: true,
      //   positionClass: 'toast-top-center',
      //   timeOut: 10000
      // });
    });
  }

  closeSubscription() {
    if (this.subscription != null) {
      this.subscription.close();
    }
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

        const boughtTicketQuery = new Parse.Query('Ticket');
        boughtTicketQuery.equalTo('number', num);

        const parseBoughtTicket = await boughtTicketQuery.first();

        this.boughtTicketSubject.next(ticketMapper.map(parseBoughtTicket));

      } catch (error) {
        this.toastr.error(error.message,"Oops!", {
          closeButton: true,
          positionClass: 'toast-top-center'
        });
      }
    }
  }
}
