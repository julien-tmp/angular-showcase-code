import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects } from './effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers), // Without this declaration it throws ReducerManager error
    // We could have a core store like
    // https://github.com/GustavoGutierrez/angular-boilerplate/blob/
    // 03c79ba601edfa8616237748f23337434097c139/src/app/core/store/core.store.ts
    // but for demo purposes, we have a lighter state manage for the global states
    // without using ngRx
    EffectsModule.forRoot(effects),
    StoreModule.forFeature('starwars', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class StarWarsStoreModule {
  // constructor() { }
}
