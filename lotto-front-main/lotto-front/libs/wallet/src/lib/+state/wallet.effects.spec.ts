import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { WalletEffects } from './wallet.effects';
import { LoadWallet, WalletLoaded } from './wallet.actions';

describe('WalletEffects', () => {
  let actions: Observable<any>;
  let effects: WalletEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        WalletEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(WalletEffects);
  });

  describe('loadWallet$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadWallet() });
      expect(effects.loadWallet$).toBeObservable(
        hot('-a-|', { a: new WalletLoaded([]) })
      );
    });
  });
});
