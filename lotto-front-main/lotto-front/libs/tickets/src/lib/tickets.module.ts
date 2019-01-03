import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ButtonsModule,
  WavesModule,
  CardsFreeModule
} from 'angular-bootstrap-md';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { SharedModule } from '@lotto-front/shared';
import { PaginationModule } from '@lotto-front/pagination';

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule,
    WavesModule,
    CardsFreeModule,
    PaginationModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TicketsListComponent }
    ]),
    SharedModule
  ],
  declarations: [TicketsListComponent]
})
export class TicketsModule {}
