import { Component, OnInit } from '@angular/core';

import * as fromActions from '../store/actions';
import * as fromStore from '../store/index';
import { Store } from '@ngrx/store';
import { Planet, Species } from '../models';
import { AppState } from '../../app.service';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'star-wars-api'.
   */
  selector: 'swapi-component',  // <swapi-component></swapi-component>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './star-wars-api.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './star-wars-api.component.html'
})
export class StarWarsApiComponent implements OnInit {
  public planets$: Store<Planet[]>;
  public species$: Store<Species[]>;
  public planetsLoaded$: Store<boolean>;
  public speciesLoaded$: Store<boolean>;
  public currentSpecies: Species;
  public currentPlanetName: string = '';

  public columns = [
    { prop: 'id' },
    { prop: 'name' },
    { prop: 'diameter' }
  ];

  public isCollapsed = true;

  constructor(
    private store: Store<fromStore.State>,
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('hello `DevModule` component');

    this.store.dispatch(new fromActions.GetAllPlanets());
    this.store.dispatch(new fromActions.GetAllSpecies());

    this.planets$ = this.store.select(fromStore.getPlanetsState);
    this.planetsLoaded$ = this.store.select(fromStore.getPlanetsLoadSuccessState);
    this.speciesLoaded$ = this.store.select(fromStore.getSpeciesLoadSuccessState);

    this.species$ = this.store.select(fromStore.getSpeciesState);

    // We need to wait for the planets to be loaded since we will insert the species data there.
    // While this might be faster for APIs with small number of items (due to network time),
    // it is not scalable for Big data.
    // If we had a lot of data, it would be better to wait for planetsLoaded and after
    // that, use this.store.dispatch(new fromActions.GetAllSpecies());. We would update the
    // Planet elements when we go through the Species list in the GetAllPlanets effect.
    this.planetsLoaded$.subscribe((planetsLoaded: boolean) => {
      if (planetsLoaded) {
        this.speciesLoaded$.subscribe((speciesLoaded: boolean) => {
          if (speciesLoaded) {

            this.species$.subscribe((species: Species[]) => {

              for (const sp of species) {
                if (sp.homeworld !== null ) {
                  this.store.dispatch(
                    new fromActions.UpdatePlanets(
                      {id: sp.id, name: sp.name, homeworld: sp.homeworld}));
                }
              }

            });
          }

        });
      }

    });
    // If someone knows why this does not work, I'd be happy to hear
    // this.planetsLoaded$.mergeMap(
    //   (planetsLoaded: boolean) => {
    //     return this.speciesLoaded$.map((speciesLoaded: boolean) => {
    //       console.log(speciesLoaded);
    //       console.log(planetsLoaded);
    //       if (planetsLoaded && speciesLoaded) {
    //       console.log('ok');
    //     }
    //   });
    // });

  }

  public changeCurrentSpecies(idx: number) {
    this.species$.subscribe((species: Species[]) => {

      // if we pushed a different species than what is displayed
      if ( (this.appState.get('currentSpecies').id !== (idx + 1)) ) {
        // console.log(this.appState.get('currentSpecies').id);
        this.currentSpecies = species[idx];
        this.isCollapsed = false;

        this.planets$.subscribe((planets: Planet[]) => {
          this.currentPlanetName = planets[this.currentSpecies.homeworld - 1].name;
        });

        // DEMO appState not useful here
        // but if we needed to access it from another component, it woulb be
        this.appState.set('currentSpecies', this.currentSpecies);
      } else {
        this.currentSpecies = undefined;
        this.appState.set('currentSpecies', this.currentSpecies);
        this.isCollapsed = true;
        this.currentPlanetName = '';
      }
    });
  }
}
