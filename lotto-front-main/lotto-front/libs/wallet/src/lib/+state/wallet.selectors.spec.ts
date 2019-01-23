import { Entity, WalletState } from './wallet.reducer';
import { walletQuery } from './wallet.selectors';

describe('Wallet Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getWalletId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createWallet = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      wallet: {
        list: [
          createWallet('PRODUCT-AAA'),
          createWallet('PRODUCT-BBB'),
          createWallet('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Wallet Selectors', () => {
    it('getAllWallet() should return the list of Wallet', () => {
      const results = walletQuery.getAllWallet(storeState);
      const selId = getWalletId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedWallet() should return the selected Entity', () => {
      const result = walletQuery.getSelectedWallet(storeState);
      const selId = getWalletId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = walletQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = walletQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
