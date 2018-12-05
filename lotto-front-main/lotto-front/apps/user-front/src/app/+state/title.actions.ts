import { Action } from '@ngrx/store';
import { Entity } from './title.reducer';

export enum TitleActionTypes {
  LoadTitle = '[Title] Load Title',
  TitleLoaded = '[Title] Title Loaded',
  TitleLoadError = '[Title] Title Load Error'
}

export class LoadTitle implements Action {
  readonly type = TitleActionTypes.LoadTitle;
}

export class TitleLoadError implements Action {
  readonly type = TitleActionTypes.TitleLoadError;
  constructor(public payload: any) {}
}

export class TitleLoaded implements Action {
  readonly type = TitleActionTypes.TitleLoaded;
  constructor(public payload: string) {}
}

export type TitleAction = LoadTitle | TitleLoaded | TitleLoadError;

export const fromTitleActions = {
  LoadTitle,
  TitleLoaded,
  TitleLoadError
};
