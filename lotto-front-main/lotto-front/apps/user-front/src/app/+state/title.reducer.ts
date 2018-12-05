import { TitleAction, TitleActionTypes } from './title.actions';

export const TITLE_FEATURE_KEY = 'title';

/**
 * Interface for the 'Title' data used in
 *  - TitleState, and
 *  - titleReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface TitleState {
  list: Entity[]; // list of Title; analogous to a sql normalized table
  selectedId?: string | number; // which Title record has been selected
  loaded: boolean; // has the Title list been loaded
  error?: any; // last none error (if any)
  title?: string;
}

export interface TitlePartialState {
  readonly [TITLE_FEATURE_KEY]: TitleState;
}

export const initialState: TitleState = {
  list: [],
  loaded: false,
  title: "Nigeria Lotto"
};

export function titleReducer(
  state: TitleState = initialState,
  action: TitleAction
): TitleState {
  switch (action.type) {
    case TitleActionTypes.TitleLoaded: {
      state = {
        ...state,
        title: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
