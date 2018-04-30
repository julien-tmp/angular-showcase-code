import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPlanets from './planets.reducer';
import * as fromSpecies from './species.reducer';

export interface State {
  planets: fromPlanets.PlanetsState;
  species: fromSpecies.SpeciesState;
}

export const STARWARS_INITIAL_STATE: State = {
  planets: fromPlanets.PLANETS_INITIAL_STATE,
  species: fromSpecies.SPECIES_INITIAL_STATE
};

// Public reducers
export const reducers: ActionReducerMap<State> = {
  planets: fromPlanets.PlanetsReducer,
  species: fromSpecies.SpeciesReducer
};

// Feature by this module
export const getPublicState = createFeatureSelector<State>(
  'starwars'
);
