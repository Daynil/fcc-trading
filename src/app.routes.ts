import { provideRouter, RouterConfig } from '@angular/router';

import { AllBooksComponent } from './app/all-books/all-books.component';
import { LogInComponent } from './app/log-in/log-in.component';

export const routes: RouterConfig = [
  { path: '', component: AllBooksComponent },
  { path: 'log-in', component: LogInComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];