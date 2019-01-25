import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { AuthRoutingModule } from './auth.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ParseService } from '@lotto-front/shared';
import { WavesModule, ButtonsModule, InputsModule } from 'angular-bootstrap-md'

const components = [LoginComponent, SignupComponent]

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    ToastrModule.forRoot()
  ],
  declarations: components,
  exports: components,
  providers: [AuthService, ParseService]
})
export class AuthModule { }
