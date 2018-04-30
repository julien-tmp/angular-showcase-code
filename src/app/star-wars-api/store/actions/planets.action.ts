import { Action } from '@ngrx/store';

export const GETALL_PLANETS = '[GetAll] Planets';
export const GETALL_PLANETS_SUCCESS = '[GetAll] Planets Success';
export const GETALL_PLANETS_FAILED = '[GetAll] Planets Failed';
export const UPDATE_PLANETS = '[Update] Planets';

export class GetAllPlanets implements Action {
  public readonly type = GETALL_PLANETS;

}

export class GetAllPlanetsSuccess implements Action {
  public readonly type = GETALL_PLANETS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetAllPlanetsFailed implements Action {
  public readonly type = GETALL_PLANETS_FAILED;

  constructor(public payload: any) {}
}

export class UpdatePlanets implements Action {
  public readonly type = UPDATE_PLANETS;

  constructor(public payload: any) {}
}

export type PlanetsActions =
  | GetAllPlanets
  | GetAllPlanetsSuccess
  | UpdatePlanets
  | GetAllPlanetsFailed;
