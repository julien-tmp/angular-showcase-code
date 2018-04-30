import * as fromFeature from '../reducers';
import { createSelector } from '@ngrx/store';

// selectors
export const getPlanetsLoadSuccessState = createSelector(
  fromFeature.getPublicState,
  (state: fromFeature.State) => state.planets.isLoadSuccess
);

export const getPlanetsIsLoadingState = createSelector(
  fromFeature.getPublicState,
  (state: fromFeature.State) => state.planets.isLoading
);

export const getPlanetsState = createSelector(
  fromFeature.getPublicState,
  (state: fromFeature.State) => state.planets.planets
);

// todo later
// export const getPlanetsErrorState = createSelector(
//   fromFeature.getPublicState,
//   (state: fromFeature.State) => state.planets.planetsError
// );
