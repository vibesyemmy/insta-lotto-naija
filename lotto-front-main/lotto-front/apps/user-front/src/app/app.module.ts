import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@lotto-front/shared';
import { ParseService } from './parse-service.service';
import { UserServiceService } from './user-service.service';
import { UserGuard } from './user.guard';

const paths = [{path: '', loadChildren: '@lotto-front/home#HomeModule'}];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    NxModule.forRoot(),
    RouterModule.forRoot(paths, { initialNavigation: 'enabled' })
  ],
  providers: [ParseService, UserServiceService, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
