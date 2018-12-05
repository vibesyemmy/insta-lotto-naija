import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { TitleEffects } from './title.effects';
import { LoadTitle, TitleLoaded } from './title.actions';

describe('TitleEffects', () => {
  let actions: Observable<any>;
  let effects: TitleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        TitleEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(TitleEffects);
  });

  describe('loadTitle$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadTitle() });
      expect(effects.loadTitle$).toBeObservable(
        hot('-a-|', { a: new TitleLoaded([]) })
      );
    });
  });
});
