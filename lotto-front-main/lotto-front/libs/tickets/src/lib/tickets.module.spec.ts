import { async, TestBed } from '@angular/core/testing';
import { TicketsModule } from './tickets.module';

describe('TicketsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TicketsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TicketsModule).toBeDefined();
  });
});
