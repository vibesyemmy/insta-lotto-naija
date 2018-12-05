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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TITLE_FEATURE_KEY, initialState as titleInitialState, titleReducer } from './+state/title.reducer';
import { TitleEffects } from './+state/title.effects';
import { TitleFacade } from './+state/title.facade';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { reducers } from './reducers';
import { CustomRouterStateSerializer } from './utils/utils';
import { TitleUpdaterEffects } from './effects/title-updater';
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const BASE_TITLE = "Lotto | "

const paths = [
  {
    path: '',
    loadChildren: '@lotto-front/home#HomeModule',
    data: {
      title: `${BASE_TITLE}Home`
    }
  }
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NxModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    RouterModule.forRoot(paths, { initialNavigation: 'enabled' }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TitleEffects, TitleUpdaterEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  providers: [
    ParseService,
    UserServiceService,
    UserGuard,
    TitleFacade,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
