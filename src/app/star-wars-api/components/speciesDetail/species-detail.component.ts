import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Species } from '../../models';

@Component({
  selector: 'species-detail',
  templateUrl: 'species-detail.component.html',
})
export class SpeciesDetailComponent {

  @Input() public currentSpecies: Species;
  @Input() public speciesPlanet: string;
  @Output() public toggledChange: EventEmitter<number> = new EventEmitter<number>();

}
