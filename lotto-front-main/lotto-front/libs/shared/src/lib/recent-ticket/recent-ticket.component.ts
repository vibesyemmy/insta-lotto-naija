import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '@lotto-front/model';

@Component({
  selector: 'lotto-front-recent-ticket',
  templateUrl: './recent-ticket.component.html',
  styleUrls: ['./recent-ticket.component.css']
})
export class RecentTicketComponent implements OnInit {

  @Input()
  tickets: Ticket[] = []

  constructor() { }

  ngOnInit() {
  }

}
