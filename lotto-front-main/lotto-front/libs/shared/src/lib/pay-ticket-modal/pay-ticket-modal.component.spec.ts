import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTicketModalComponent } from './pay-ticket-modal.component';

describe('PayTicketModalComponent', () => {
  let component: PayTicketModalComponent;
  let fixture: ComponentFixture<PayTicketModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayTicketModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
