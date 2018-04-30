import { Routes } from '@angular/router';
import { StarWarsApiComponent } from './star-wars-api/container';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: StarWarsApiComponent },
  { path: 'swapi',  component: StarWarsApiComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: '**',    component: NoContentComponent },
];
