import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'planet-list',
  templateUrl: 'planet-list.component.html',
  styleUrls: [ 'planet-list.component.css' ]
})
export class PlanetListComponent {
  @Input() public planets$: any;
  @Input() public isCollapsed: boolean;
  @Output() public toggledChange: EventEmitter<number> = new EventEmitter<number>();

  public loaded$ = true;

  public columns = [
    { prop: 'id' },
    { prop: 'name' },
    { prop: 'diameter' }
  ];

}
