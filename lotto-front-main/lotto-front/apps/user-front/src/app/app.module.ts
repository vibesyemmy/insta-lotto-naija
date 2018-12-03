import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@lotto-front/shared';
import { ParseService } from '@lotto-front/shared';
import { UserServiceService } from './user-service.service';
import { UserGuard } from './user.guard';
import { ToastrModule } from 'ngx-toastr';

const paths = [{path: '', loadChildren: '@lotto-front/home#HomeModule'}];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    NxModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot(paths, { initialNavigation: 'enabled' })
  ],
  providers: [ParseService, UserServiceService, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
