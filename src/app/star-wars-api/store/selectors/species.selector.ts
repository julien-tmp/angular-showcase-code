import * as fromFeature from '../reducers';
import { createSelector } from '@ngrx/store';

// selectors
export const getSpeciesLoadSuccessState = createSelector(
  fromFeature.getPublicState,
  (state: fromFeature.State) => state.species.isLoadSuccess
);

export const getSpeciesIsLoadingState = createSelector(
  fromFeature.getPublicState,
  (state: fromFeature.State) => state.species.isLoading
);

export const getSpeciesState = createSelector(
  fromFeature.getPublicState,
  (state: fromFeature.State) => state.species.species
);

// todo later
// export const getSpeciesErrorState = createSelector(
//   fromFeature.getPublicState,
//   (state: fromFeature.State) => state.species.speciesError
// );
