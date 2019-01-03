import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Ticket, generateDummyTickets, hasExpired, TicketResponse } from '@lotto-front/model';
import { TicketService } from '@lotto-front/shared';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'lotto-front-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsListComponent implements OnInit {
  // tickets: Ticket[] = generateDummyTickets(9);
  myTicketsObservable = this.ts.myTicketsObservable;
  isLoading = this.myTicketsObservable.pipe(
    map((res: TicketResponse) => res.isLoading)
  );
  tickets: Observable<Ticket[]> = this.ts.myTicketsObservable.pipe(
    map((res: TicketResponse) => res.tickets)
  );
  ticketsTotal = this.ts.myTicketsCountObservable

  constructor(private ts: TicketService) { }

  ngOnInit() {
    this.ts.getMyTicketsCount();
    this.ts.getMyTicketsPaginated(1);
  }

  getTicketBGState(ticket: Ticket): string {
    if (hasExpired(ticket)) {
      return 'bg-danger';
    } else if (!hasExpired(ticket) && !ticket.picked) {
      return 'bg-primary';
    } else if (ticket.picked) {
      return 'bg-success';
    }
  }

  loadTickets(page: number) {
    if (page >= 0) {
      this.ts.getMyTicketsPaginated(page);
    }
  }
}
