import { TitleLoaded } from './title.actions';
import {
  TitleState,
  Entity,
  initialState,
  titleReducer
} from './title.reducer';

describe('Title Reducer', () => {
  const getTitleId = it => it['id'];
  let createTitle;

  beforeEach(() => {
    createTitle = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Title actions ', () => {
    it('should return set the list of known Title', () => {
      const titles = [createTitle('PRODUCT-AAA'), createTitle('PRODUCT-zzz')];
      const action = new TitleLoaded(titles);
      const result: TitleState = titleReducer(initialState, action);
      const selId: string = getTitleId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = titleReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
