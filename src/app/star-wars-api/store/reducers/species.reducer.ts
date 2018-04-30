import * as Action from '../actions';
import { Species } from '../../models';

export interface SpeciesState {
  isLoading: boolean;
  isLoadSuccess: boolean;
  species: Species[];
}

export const SPECIES_INITIAL_STATE: SpeciesState = {
  isLoading: false,
  isLoadSuccess: false,
  species: [{
    id: 0,
    homeworld: 0,
    name: 'Waiting for the API',
    classification: 'unknown',
    language: 'unknown'
  }]
};

export function SpeciesReducer(state = SPECIES_INITIAL_STATE,
                               action: Action.SpeciesActions): SpeciesState {
  switch (action.type) {
    case Action.GETALL_SPECIES: {
      return {
        ...state,
        isLoading: true,
        isLoadSuccess: false,
        species: []
      };
    }

    case Action.GETALL_SPECIES_SUCCESS: {

      return {
        ...state,
        isLoading: false,
        isLoadSuccess: true,
        species: action.payload
      };
    }

    case Action.GETALL_SPECIES_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoadSuccess: false,
        species: []
      };
    }

    default: {
      return state;
    }
  }
}
