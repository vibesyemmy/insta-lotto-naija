import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Ticket, initTicket } from '@lotto-front/model';

@Component({
  selector: 'lotto-front-pay-ticket-modal',
  templateUrl: './pay-ticket-modal.component.html',
  styleUrls: ['./pay-ticket-modal.component.css']
})
export class PayTicketModalComponent implements OnInit {
  ticketNumber = '23482';
  paymentUrl = 'https://google.com'
  ticket: Ticket = initTicket;
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

}
