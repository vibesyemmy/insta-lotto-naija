import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ParseService, TicketService, LoginRequest, AuthResponse, RegisterRequest, PayTicketModalComponent } from '@lotto-front/shared';
import { environment } from '../environments/environment';
import { Ticket, TicketResponse, initTicket, UserData, initialUser, map as mapUser } from '@lotto-front/model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'lotto-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'user-front';
  bsModalRef: BsModalRef;
  modalRef: MDBModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  ticketsObservable: Observable<Ticket[]> = this.ts.recentObservable.pipe(
    map((res: TicketResponse) => res.tickets)
  );
  disposable: Subscription;
  compDisposable: Subscription[] = [];

  @ViewChild('login') public loginRef: TemplateRef<any>;
  @ViewChild('register') public registerRef: TemplateRef<any>;
  @ViewChild('ticketPayment') public payRef: TemplateRef<any>;

  loginForm: FormGroup;
  registerForm: FormGroup;

  inflight = false;

  isLoggedIn = false;

  boughtTicket = initTicket;

  user: UserData = initialUser;

  constructor(
    private ps: ParseService,
    private ts: TicketService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    fb: FormBuilder
    ) {
      const inProd = environment.production;
      this.ps.initialize(inProd);
      this.ts.initialize();
      this.isLoggedIn = this.ps.getUser() != null ? true : false;
      this.user = mapUser(this.ps.getUser())

      this.loginForm = fb.group({
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.required]
      });

      this.registerForm = fb.group({
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.required],
        phone: [null, Validators.required]
      });
    }

  ngOnInit() {
    this.disposable = this.ts.recentObservable.subscribe(
      (res) => {
        this.inflight = res.isLoading
      },
      (err) => {
        if (err .message === 'Invalid session token') {
          const appId = environment.parseParams.appId;
          localStorage.removeItem(`Parse/${appId}/currentUser`);
          location.href = '/';
        } else {
          this.toastr.error(err.message,"Oops!", {
            closeButton: true,
            positionClass: 'toast-top-center'
          });
        }
      }
    )
    this.compDisposable.push(this.disposable);

    const authDisposable = this.ps.authObservable.subscribe(
      (res: AuthResponse) => {
        this.inflight = res.inFlight;
        this.bsModalRef.hide();

        if (!res.inFlight) {
          if (res.error === undefined) {
            // console.log(res);
            location.href = '/';
          } else {
            this.toastr.error(res.error.message,"Oops!", {
              closeButton: true,
              positionClass: 'toast-top-center',
              timeOut: 10000
            });
          }
        }
      },
      err => console.error(err)
    )

    this.compDisposable.push(authDisposable);
  }

  ngOnDestroy() {
    this.ts.closeSubscription();
    for (const d of this.compDisposable) {
      d.unsubscribe();
    }
  }

  doLogin() {
    const req: LoginRequest = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.ps.login(req);
  }

  doSignUp() {
    const req: RegisterRequest = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      phone: this.registerForm.get('phone').value
    }
    this.ps.signUp(req)
  }

  handleToolbarAction(action: string) {
    console.log(action);
    if (action === 'login') {
      this.bsModalRef = this.modalService.show(this.loginRef, this.config);
    } else if (action === 'signup') {
      this.bsModalRef = this.modalService.show(this.registerRef, this.config);
    }
  }
}
