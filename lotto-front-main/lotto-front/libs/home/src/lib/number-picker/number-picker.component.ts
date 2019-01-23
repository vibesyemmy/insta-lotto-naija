import { Component, OnInit, ViewChild, ElementRef, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TicketService } from '@lotto-front/shared';

@Component({
  selector: 'lotto-front-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberPickerComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public pinCodeArray: any[];
  lottoForm: FormGroup;
  compositeSubscription: Subscription[] = [];
  @ViewChild("loading") loadingRef: ElementRef;
  isValid = false;

  codeSize = 5;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(fb: FormBuilder, private ts: TicketService) {
    this.initiateBuilder();
  }

  initiateBuilder() {
    this.lottoForm = new FormGroup({});
    const v_pinCodeArray: any[] = [];
    for (let i = 0; i < this.codeSize; i++) {
      const formController: FormControl = new FormControl({ value: '', disabled: true }, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(1)]));
      this.lottoForm.addControl('pinCode' + i, formController);
    }
    Object.keys(this.lottoForm.value).forEach(function (key) {
      v_pinCodeArray.push(key);
    });
    this.pinCodeArray = v_pinCodeArray;
    console.log(this.pinCodeArray.length);
    this.lottoForm.get('pinCode0').enable();
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

  ngOnChanges(changes: SimpleChanges) {
    const stylebody = document.body.style;
    console.log(stylebody);
    this.initiateBuilder();
  }

  ngAfterViewInit() {
    const input: HTMLElement = document.querySelectorAll('.pinCodeInput').item(0) as HTMLElement;
    input.focus();
  }

  ngOnDestroy() {
    if (this.compositeSubscription.length > 0) {
      for (const sub of this.compositeSubscription) {
        sub.unsubscribe()
      }
    }
  }

  addTicket() {
    let ci = ''
    Object.keys(this.lottoForm.value).forEach((key) => {
      ci += this.lottoForm.value[key];
    });
    const num = ci;
    this.ts.buyTicket(num);
    this.lottoForm.reset();
  }

  onKeyUp($event: any, item: any, index: any) {
    let v_index;

    const reg = new RegExp("[0-9]");

    if ($event.key === "Backspace") {
      if (index === 0) {
        v_index = 0;
      } else {
        v_index = index - 1;
        this.lottoForm.get('pinCode' + index).disable();
      }
    } else {
      if (reg.test($event.target.value)) {

        if (index === this.codeSize - 1) {
          v_index = this.codeSize - 1;
        } else {
          v_index = index + 1;
          this.lottoForm.get('pinCode' + v_index).enable();

        }
      }
    }

    const input: HTMLElement = document.querySelectorAll('.pinCodeInput').item(v_index) as HTMLElement;
    input.focus();

    let pinCodeValue = '';

    if (index === this.codeSize - 1 && $event.key !== "Backspace") {
      let ci = ''
      Object.keys(this.lottoForm.value).forEach((key) => {
        ci += this.lottoForm.value[key];
      });
      pinCodeValue = ci.trim();
    } else if ($event.key === "Backspace") {
      pinCodeValue = '';
    }

    if (pinCodeValue.trim().length === 5) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }

  }


  onKeyDown($event: any) {
    if ($event.key !== "Backspace") {

      if ($event.target.value.length === 1) {
        return false;
      }

    }
  }

}
