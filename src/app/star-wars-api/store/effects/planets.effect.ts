import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as Act from '../actions';
import { PlanetService } from '../../async';
import { Planet } from '../../models';

@Injectable()
export class PlanetsEffects {

  @Effect()
  private GetAllPlanets: Observable<Action> = this.actions$.
  ofType<Act.GetAllPlanets>(Act.GETALL_PLANETS)
    .mergeMap((action) =>
      this.planetService$.getAllPlanets()
        .map((data) => {

          const planets: Planet[] = [];

          for (const value of data) {
            planets.push({
              id: parseInt(value['url'].split(/\//)[5], 10),
              name: value['name'],
              diameter: value['diameter'],
              species: []
            });
          }

          return new Act.GetAllPlanetsSuccess(
            planets.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
          );
        })
        .catch((error) => of(new Act.GetAllPlanetsFailed(error)))
    );

  constructor(
    private actions$: Actions,
    private planetService$: PlanetService
  ) {}
}
