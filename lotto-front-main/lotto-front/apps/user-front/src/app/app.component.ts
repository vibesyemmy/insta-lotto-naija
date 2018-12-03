import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParseService, TicketService } from '@lotto-front/shared';
import { environment } from '../environments/environment';
import * as Parse from 'parse';
import { ParseParams, Ticket, TicketResponse } from '@lotto-front/model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'lotto-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'user-front';
  ticketsObservable: Observable<Ticket[]> = this.ts.recentObservable.pipe(
    map((res: TicketResponse) => res.tickets)
  );
  disposable: Subscription;

  constructor(private ps: ParseService, private ts: TicketService, private toastr: ToastrService) {}

  ngOnInit() {
    this.disposable = this.ts.recentObservable.subscribe(
      () => {},
      (err) => {
        this.toastr.error(err,"Oops!", {
          closeButton: true,
          positionClass: 'toast-top-center'
        })
      }
    )
  }

  ngOnDestroy() {
    this.disposable.unsubscribe();
  }
}
