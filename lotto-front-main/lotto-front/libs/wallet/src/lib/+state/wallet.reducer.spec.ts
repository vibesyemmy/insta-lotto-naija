import { WalletLoaded } from './wallet.actions';
import {
  WalletState,
  Entity,
  initialWalletState,
  walletReducer
} from './wallet.reducer';

describe('Wallet Reducer', () => {
  const getWalletId = it => it['id'];
  let createWallet;

  beforeEach(() => {
    createWallet = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Wallet actions ', () => {
    it('should return set the list of known Wallet', () => {
      const wallets = [
        createWallet('PRODUCT-AAA'),
        createWallet('PRODUCT-zzz')
      ];
      const action = new WalletLoaded(wallets);
      const result: WalletState = walletReducer(initialWalletState, action);
      const selId: string = getWalletId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = walletReducer(initialWalletState, action);

      expect(result).toBe(initialWalletState);
    });
  });
});
