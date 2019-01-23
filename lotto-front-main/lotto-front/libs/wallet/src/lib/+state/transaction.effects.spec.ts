import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { TransactionEffects } from './transaction.effects';
import { LoadTransaction, TransactionLoaded } from './transaction.actions';

describe('TransactionEffects', () => {
  let actions: Observable<any>;
  let effects: TransactionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        TransactionEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(TransactionEffects);
  });

  describe('loadTransaction$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadTransaction() });
      expect(effects.loadTransaction$).toBeObservable(
        hot('-a-|', { a: new TransactionLoaded([]) })
      );
    });
  });
});
