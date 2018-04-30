import { Component, OnInit } from '@angular/core';

import { AppState } from '../../app.service';

@Component({
  selector: 'dev-module',
  template: `
      <h1>Dev Module</h1>
      <div class="container-fluid">
          Here we develop new features.
      </div>
      AppState: {{appState | json }}

  `,
})
export class DevModuleComponent implements OnInit {


  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('hello `DevModule` component');
  }
}
