import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'lotto-front-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input()
  total: Observable<number>;

  @Output()
  offset: EventEmitter<number> = new EventEmitter();
  pager: any = {};

  count = 0;

  constructor(private pagerService: PaginationService) { }

  ngOnInit() {
    this.total.pipe(
      skip(1)
    ).subscribe(
      _total => {
        this.count = _total;
        this.setPage(1);
      }
    )
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.count, page);
    this.offset.emit(this.pager.currentPage);
  }

}
