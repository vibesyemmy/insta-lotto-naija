import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription, Observable, onErrorResumeNext, of } from 'rxjs';
import { startWith, map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

interface Login {
  inFlight: boolean;
  error?: Error;
  status: boolean;
}

@Component({
  selector: 'lotto-front-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSubscription: Subscription[] = [];
  inFlight = false;

  constructor(fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.loginForm = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.loginSubscription != null) {
      this.loginSubscription.forEach((sub) => sub.unsubscribe());
    }
  }

  doLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const loginObservable: Observable<Login> = this.authService.isUserAuthenticated(email, password).pipe(
      startWith({
        inFlight: true,
        error: null,
        status: false
      }),
      map(stat => {
        return <Login> {
          inFlight: false,
          status: stat,
          error: null
        }
      }),
      catchError(error => of(
        <Login> {
          inFlight: false,
          status: false,
          error: error
        }
      ))
    );
    const loginSub = loginObservable.subscribe((status: Login) => {
      this.inFlight = status.inFlight

      if (status.error != null) {
        this.toastr.error(status.error.message, "Sign Failed", {
          closeButton: true,
          positionClass: 'toast-top-center',
          timeOut: 10000
        })
      }

      if (!this.inFlight && status.status) {
        setTimeout(() => {
          this.authService.redirect()
        }, 1000);
      }
    }, error => {
      this.toastr.error(error.message, "Sign Failed", {
        closeButton: true,
        positionClass: 'toast-top-center',
        timeOut: 10000
      })
    });

    this.loginSubscription.push(loginSub);
  }

}
