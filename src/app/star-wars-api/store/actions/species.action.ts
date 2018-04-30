import { Action } from '@ngrx/store';

export const GETALL_SPECIES = '[GetAll] Species';
export const GETALL_SPECIES_SUCCESS = '[GetAll] Species Success';
export const GETALL_SPECIES_FAILED = '[GetAll] Species Failed';

export class GetAllSpecies implements Action {
  public readonly type = GETALL_SPECIES;

}

export class GetAllSpeciesSuccess implements Action {
  public readonly type = GETALL_SPECIES_SUCCESS;

  constructor(public payload: any) {}
}

export class GetAllSpeciesFailed implements Action {
  public readonly type = GETALL_SPECIES_FAILED;

  constructor(public payload: any) {}
}

export type SpeciesActions =
  | GetAllSpecies
  | GetAllSpeciesSuccess
  | GetAllSpeciesFailed;
