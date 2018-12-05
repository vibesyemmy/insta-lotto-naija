import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { TitleEffects } from './title.effects';
import { TitleFacade } from './title.facade';

import { titleQuery } from './title.selectors';
import { LoadTitle, TitleLoaded } from './title.actions';
import {
  TitleState,
  Entity,
  initialState,
  titleReducer
} from './title.reducer';

interface TestSchema {
  title: TitleState;
}

describe('TitleFacade', () => {
  let facade: TitleFacade;
  let store: Store<TestSchema>;
  let createTitle;

  beforeEach(() => {
    createTitle = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('title', titleReducer, { initialState }),
          EffectsModule.forFeature([TitleEffects])
        ],
        providers: [TitleFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(TitleFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allTitle$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allTitle$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `TitleLoaded` to manually submit list for state management
     */
    it('allTitle$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allTitle$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new TitleLoaded([createTitle('AAA'), createTitle('BBB')])
        );

        list = await readFirst(facade.allTitle$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
