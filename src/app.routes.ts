import { provideRouter, RouterConfig } from '@angular/router';

import { AllBooksComponent } from './app/all-books/all-books.component';
import { LogInComponent } from './app/log-in/log-in.component';
import { SignUpComponent } from './app/sign-up/sign-up.component';

export const routes: RouterConfig = [
  { path: '', component: AllBooksComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];