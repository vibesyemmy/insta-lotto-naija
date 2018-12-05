import { Injectable } from "@angular/core";

import { Effect, Actions, ofType } from "@ngrx/effects";

import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";

import { RouterStateTitle } from "../utils/utils";

import { Title } from "@angular/platform-browser";
import { tap } from "rxjs/operators";

@Injectable()
export class TitleUpdaterEffects {

  @Effect({ dispatch: false })
  updateTitle$ = this.actions.pipe(
    ofType(ROUTER_NAVIGATION),
    tap((action: RouterNavigationAction<RouterStateTitle>) => {
      this.titleService.setTitle(action.payload.routerState.title);
    })
  );

  constructor(private actions: Actions,
              private titleService: Title) {}
}
