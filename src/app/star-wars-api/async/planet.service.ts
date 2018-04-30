import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class PlanetService extends BaseService {
  /**
   * Relative base current api
   */
  private relativeUrl = 'planets/?page=';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  public getAllPlanets(pageNumber: number = 0) {

    pageNumber++;
    return this.get(this.relativeUrl + pageNumber.toString()).flatMap( (res) => {

      if ( res['next'] === null) { // if we are at the end, stop recursion here
        return Observable.of(res['results']);
      } else { // there are more levels to go deeper
        // console.log(res)
        return Observable.forkJoin(
          Observable.of(res['results']),
          this.getAllPlanets(pageNumber)
        ).map(([s1, s2]) => {
          return Array.isArray(s2) ? [...s1, ...s2] : [...s1, s2];
        });
      }
    });
  }

  // NOT IN USE
  // public update(planet: Planet) {
  //   return this.put(this.relativeUrl, planet);
  // }
  //
  // public read(id: number): Observable<Planet> {
  //   return this.get(`${this.relativeUrl}${id.toString()}`);
  // }
  // public delete(id: number) {
  //   return this.del(`${this.relativeUrl}${id.toString()}`);
  // }
  // create ...

}
