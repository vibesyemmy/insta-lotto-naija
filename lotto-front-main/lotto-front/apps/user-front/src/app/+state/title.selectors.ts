import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TITLE_FEATURE_KEY, TitleState } from './title.reducer';

// Lookup the 'Title' feature state managed by NgRx
const getTitleState = createFeatureSelector<TitleState>(TITLE_FEATURE_KEY);

const getLoaded = createSelector(
  getTitleState,
  (state: TitleState) => state.loaded
);
const getError = createSelector(
  getTitleState,
  (state: TitleState) => state.error
);

const getAllTitle = createSelector(
  getTitleState,
  getLoaded,
  (state: TitleState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getTitleState,
  (state: TitleState) => state.selectedId
);
const getSelectedTitle = createSelector(
  getAllTitle,
  getSelectedId,
  (title, id) => {
    const result = title.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const titleQuery = {
  getLoaded,
  getError,
  getAllTitle,
  getSelectedTitle
};
