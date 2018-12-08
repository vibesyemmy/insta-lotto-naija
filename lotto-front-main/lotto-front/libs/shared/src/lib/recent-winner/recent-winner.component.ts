import { Component, OnInit, Input } from '@angular/core';
import { Draw, initDraw } from '@lotto-front/model';

@Component({
  selector: 'lotto-front-recent-winner',
  templateUrl: './recent-winner.component.html',
  styleUrls: ['./recent-winner.component.css']
})
export class RecentWinnerComponent implements OnInit {

  @Input()
  draws: Draw = initDraw

  constructor() { }

  ngOnInit() {
  }

}
