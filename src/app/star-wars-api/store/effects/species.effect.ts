import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as Act from '../actions';
import { Species } from '../../models';
import { SpeciesService } from '../../async';

@Injectable()
export class SpeciesEffects {

  @Effect()
  private GetAllSpecies: Observable<Action> = this.actions$.
  ofType<Act.GetAllSpecies>(Act.GETALL_SPECIES)
    .mergeMap((action) =>
      this.speciesService$.getAllSpecies()
        .map((data) => {

          const species: Species[] = [];

          for (const value of data) {

            species.push({
              id: parseInt(value['url'].split(/\//)[5], 10),
              homeworld: value['homeworld'] !== null ?
                parseInt(value['homeworld'].split(/\//)[5], 10) : null,
              name: value['name'],
              classification: value['classification'],
              language: value['language']
            });
          }

          // let's sort it by ID and return it
          return new Act.GetAllSpeciesSuccess(
            species.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
          );
        })
        .catch((error) => of(new Act.GetAllSpeciesFailed(error)))
    );

  constructor(
    private actions$: Actions,
    private speciesService$: SpeciesService
  ) {}
}
