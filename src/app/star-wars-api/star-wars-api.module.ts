import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PlanetService, SpeciesService } from './async';
import { StarWarsStoreModule } from './store';
import { PlanetListComponent } from './components/planetList';
import { SpeciesDetailComponent } from './components/speciesDetail';
import { StarWarsApiComponent } from './container';

@NgModule({
  declarations: [
    StarWarsApiComponent,
    PlanetListComponent,
    SpeciesDetailComponent,
  ],
  imports: [
    CommonModule,
    StarWarsStoreModule,
    NgxDatatableModule,
    NgbModule,
  ],
  providers: [
    PlanetService,
    SpeciesService
  ]
})

export class StarWarsApiModule {
}