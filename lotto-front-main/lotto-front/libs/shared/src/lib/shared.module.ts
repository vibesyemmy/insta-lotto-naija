import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeToolbarComponent } from './home-toolbar/home-toolbar.component';
import { BigInputComponent } from './big-input/big-input.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HomeToolbarComponent, BigInputComponent, TicketInfoComponent],
  exports: [HomeToolbarComponent, BigInputComponent]
})
export class SharedModule {}
