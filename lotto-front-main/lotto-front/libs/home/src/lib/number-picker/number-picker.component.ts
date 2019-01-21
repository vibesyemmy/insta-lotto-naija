import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TicketService } from '@lotto-front/shared';

@Component({
  selector: 'lotto-front-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss']
})
export class NumberPickerComponent implements OnInit, OnDestroy {

  lottoForm: FormGroup;

  compositeSubscription: Subscription[] = [];

  @ViewChild("digit1") digit1Element: ElementRef;
  @ViewChild("digit2") digit2Element: ElementRef;
  @ViewChild("digit3") digit3Element: ElementRef;
  @ViewChild("digit4") digit4Element: ElementRef;
  @ViewChild("digit5") digit5Element: ElementRef;
  @ViewChild("loading") loadingRef: ElementRef;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(fb: FormBuilder, private ts: TicketService) {
    this.lottoForm = fb.group({
      'digit1' : [null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(1)])],
      'digit2' : [null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(1)])],
      'digit3' : [null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(1)])],
      'digit4' : [null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(1)])],
      'digit5' : [null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(1)])],
      'validate' : ''
    });
  }

  ngOnInit() {
    // const sub1 = this.lottoForm.get("digit1").valueChanges.pipe(
    //   filter((value: string) => value.length === 1),
    // ).subscribe(() => {
    //   this.digit2Element.nativeElement.focus()
    // });
    // const sub2 = this.lottoForm.get("digit2").valueChanges.pipe(
    //   filter((value: string) => value.length === 1)
    // ).subscribe(() => {
    //   this.digit3Element.nativeElement.focus()
    // });
    // const sub3 = this.lottoForm.get("digit3").valueChanges.pipe(
    //   filter((value: string) => value.length === 1)
    // ).subscribe(() => {
    //   this.digit4Element.nativeElement.focus()
    // });
    // const sub4 = this.lottoForm.get("digit4").valueChanges.pipe(
    //   filter((value: string) => value.length === 1)
    // ).subscribe(() => {
    //   this.digit5Element.nativeElement.focus()
    // });
    // this.compositeSubscription = [sub1, sub2, sub3, sub4]
  }

  ngOnDestroy() {
    if (this.compositeSubscription.length > 0) {
      for(const sub of this.compositeSubscription) {
        sub.unsubscribe()
      }
    }
  }

  addTicket(ticketNumbers) {
    const num = `${ticketNumbers.digit1}${ticketNumbers.digit2}${ticketNumbers.digit3}${ticketNumbers.digit4}${ticketNumbers.digit5}`;
    this.ts.buyTicket(num);
    this.lottoForm.reset();
  }

  previousFocus(num) {
    switch(num) {
      case 1: {
        this.digit1Element.nativeElement.focus()
        break;
      }
      case 2: {
        this.digit2Element.nativeElement.focus()
        break;
      }
      case 3: {
        this.digit3Element.nativeElement.focus()
        break;
      }
      case 4: {
        this.digit4Element.nativeElement.focus()
        break;
      }
    }
  }

  onKey(event: any, num) { // without type info
    if (event.key === 'Backspace') {
      this.previousFocus(num);
    } else {
      switch (num) {
        case 0: {
          this.digit2Element.nativeElement.focus()
          break;
        }
        case 1: {
          this.digit3Element.nativeElement.focus()
          break;
        }
        case 2: {
          this.digit4Element.nativeElement.focus()
          break;
        }
        case 3: {
          this.digit5Element.nativeElement.focus()
          break;
        }
      }
    }
  }
}
