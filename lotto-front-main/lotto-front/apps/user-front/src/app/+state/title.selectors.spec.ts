import { Entity, TitleState } from './title.reducer';
import { titleQuery } from './title.selectors';

describe('Title Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTitleId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createTitle = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      title: {
        list: [
          createTitle('PRODUCT-AAA'),
          createTitle('PRODUCT-BBB'),
          createTitle('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Title Selectors', () => {
    it('getAllTitle() should return the list of Title', () => {
      const results = titleQuery.getAllTitle(storeState);
      const selId = getTitleId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedTitle() should return the selected Entity', () => {
      const result = titleQuery.getSelectedTitle(storeState);
      const selId = getTitleId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = titleQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = titleQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
