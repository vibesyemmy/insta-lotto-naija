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

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [HomeToolbarComponent, BigInputComponent, TicketInfoComponent, RecentTicketComponent, RecentWinnerComponent, TicketStubComponent],
  exports: [HomeToolbarComponent, BigInputComponent, RecentTicketComponent, RecentWinnerComponent],
  providers: [ParseService, TicketService]
})
export class SharedModule {}
