import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class SpeciesService extends BaseService {
  /**
   * Relative base current api
   */
  private relativeUrl = 'species/?page=';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  public getAllSpecies(pageNumber: number = 0) {

    pageNumber++;
    return this.get(this.relativeUrl + pageNumber.toString()).flatMap( (res) => {

      if ( res['next'] === null) { // if we are at the end, stop recursion here
        return Observable.of(res['results']);
      } else { // there are more levels to go deeper
        return Observable.forkJoin(
          Observable.of(res['results']),
          this.getAllSpecies(pageNumber)
        ).map(([s1, s2]) => {
          return Array.isArray(s2) ? [...s1, ...s2] : [...s1, s2];
        });
      }
    });
  }

}
