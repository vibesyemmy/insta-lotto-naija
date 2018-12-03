import { Component, OnInit, Input } from '@angular/core';
import { Ticket, initTicket } from '@lotto-front/model';

@Component({
  selector: 'lotto-front-ticket-stub',
  templateUrl: './ticket-stub.component.html',
  styleUrls: ['./ticket-stub.component.css']
})
export class TicketStubComponent implements OnInit {

  @Input()
  ticket: Ticket = initTicket;

  constructor() { }

  ngOnInit() {
  }

}
