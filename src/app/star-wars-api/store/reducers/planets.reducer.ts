import * as Action from '../actions';
import { Planet } from '../../models';

export interface PlanetsState {
  isLoading: boolean;
  isLoadSuccess: boolean;
  planets: Planet[];
}

export const PLANETS_INITIAL_STATE: PlanetsState = {
  isLoading: false,
  isLoadSuccess: false,
  planets: [{ id: 0, name: 'Waiting for the API', diameter: 'unknown', species: []}]
};

export function PlanetsReducer(state = PLANETS_INITIAL_STATE, action: Action.PlanetsActions):
  PlanetsState {
  switch (action.type) {

    case Action.UPDATE_PLANETS: {
      // console.log(updatePlanetInPlanets(state.planets, action.payload))
      // state
      return {
        ...state,
        planets: updatePlanetInPlanets(state.planets, action.payload)
      };
    }

    case Action.GETALL_PLANETS: {
      return {
        ...state,
        isLoading: true,
        isLoadSuccess: false,
        planets: []
      };
    }

    case Action.GETALL_PLANETS_SUCCESS: {

      return {
        ...state,
        isLoading: false,
        isLoadSuccess: true,
        planets: action.payload
      };
    }

    case Action.GETALL_PLANETS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLoadSuccess: false,
        planets: []
      };
    }

    default: {
      return state;
    }
  }
}

function updatePlanetInPlanets(array, action) {
  return array.map( (item) => {
    if (item.id !== action.homeworld) {
      return item;
    }

    // avoids duplicate when changing route in the app,
    // if this looks hacky, let me know how to do it better please!
    if ((item.species.length === 0) || ((item.species[item.species.length - 1].id)
      !== action.id ) ) {
      return {
        ...item,
        species: [
          ...item.species.slice(),
          {name: action.name, id: action.id}
        ]
      };
    }

    return {
      ...item,
      species: [
        ...item.species.slice()
      ]
    };
  });
}
