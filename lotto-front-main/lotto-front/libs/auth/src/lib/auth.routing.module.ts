import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const BASE_TITLE = "Lotto | "

const routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: `${BASE_TITLE}Sign In`
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: `${BASE_TITLE}Sign Up`
    }
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

