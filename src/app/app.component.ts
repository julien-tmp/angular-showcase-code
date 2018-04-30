/**
 * Angular 2 decorators and async
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav class="navbar navbar-light bg-light navbar-expand-lg">
        <a [routerLink]=" ['./swapi'] "
           routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}"
           class="navbar-brand">The wonderful interview code</a>
        <button class="navbar-toggler" type="button" (click)="isCollapsed = !isCollapsed"
                [attr.aria-expanded]="!isCollapsed" aria-controls="collapseMe">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed" id="collapseMe">
            <ul class="navbar-nav ml-auto">
                <li class="navbar-item">
                    <a [routerLink]=" ['./swapi'] "
                       routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}"
                        class="nav-link"
                       (click)="isCollapsed = !isCollapsed">
                        Home/SWAPI
                    </a>
                </li>
                <li class="navbar-item">
                    <a [routerLink]=" ['./detail'] "
                       routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}"
                        class="nav-link"
                       (click)="isCollapsed = !isCollapsed">
                        Lazy-Loaded-Component-Example
                    </a>
                </li>
                <li class="navbar-item">
                    <a [routerLink]=" ['./about'] "
                       routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}"
                        class="nav-link"
                       (click)="isCollapsed = !isCollapsed">
                        About
                    </a>
                </li>

                <li class="navbar-item">
                    <a  *ngIf="showDevModule" [routerLink]=" ['./dev-module']  "
                       routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}"
                        class="nav-link"
                        (click)="isCollapsed = !isCollapsed">
                        Dev-Module
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    <main>
            <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  public showDevModule: boolean = environment.showDevModule;
  public isCollapsed = true;

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
}
