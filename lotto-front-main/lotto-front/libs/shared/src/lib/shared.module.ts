import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeToolbarComponent } from './home-toolbar/home-toolbar.component';
import { BigInputComponent } from './big-input/big-input.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { ParseService } from './parse.service';
import { RecentTicketComponent } from './recent-ticket/recent-ticket.component';
import { RecentWinnerComponent } from './recent-winner/recent-winner.component';
import { TicketStubComponent } from './ticket-stub/ticket-stub.component';
import { TicketService } from './ticket.service';
import { RouterModule } from '@angular/router';
import { PayTicketModalComponent } from './pay-ticket-modal/pay-ticket-modal.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [RouterModule, CommonModule, MDBBootstrapModule],
  declarations: [HomeToolbarComponent, BigInputComponent, TicketInfoComponent, RecentTicketComponent, RecentWinnerComponent, TicketStubComponent, PayTicketModalComponent],
  exports: [HomeToolbarComponent, BigInputComponent, RecentTicketComponent, RecentWinnerComponent, PayTicketModalComponent, MDBBootstrapModule],
  providers: [ParseService, TicketService]
})
export class SharedModule {}
