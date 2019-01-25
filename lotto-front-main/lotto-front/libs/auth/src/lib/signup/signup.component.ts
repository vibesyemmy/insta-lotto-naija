import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { startWith, map, catchError } from 'rxjs/operators';

interface Register {
  inFlight: boolean;
  error?: Error;
  status: boolean;
}

const initRegister: Register = {
  inFlight: true,
  status: false,
  error: null
};

@Component({
  selector: 'lotto-front-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {
  signUpForm: FormGroup;
  signUpSubscription: Subscription[] = [];
  inFlight = false;

  constructor(fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.signUpForm = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }

  ngOnDestroy() {
    this.signUpSubscription.forEach((sub) => sub.unsubscribe());
  }

  doSignUp() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const phone = this.signUpForm.get('phone').value;

    const signUpObservable: Observable<Register> = this.authService.signUp(email, password, phone).pipe(
      startWith(initRegister),
      map(status => <Register>{
        ...initRegister,
        inFlight: false,
        status: status
      }),
      catchError(err => of(<Register> {
        ...initRegister,
        inFlight: false,
        error: err
      }))
    );
    const signUpSub = signUpObservable.subscribe((register: Register) => {
      this.inFlight = register.inFlight

      if (register.error != null) {
        this.toastr.error(register.error.message, "Sign Up Failed", {
          closeButton: true,
          positionClass: 'toast-top-center',
          timeOut: 10000
        })
      }

      if (!this.inFlight && register.status) {
        setTimeout(() => {
          this.authService.redirect()
        }, 1000);
      }
    });

    this.signUpSubscription.push(signUpSub);
  }

}
