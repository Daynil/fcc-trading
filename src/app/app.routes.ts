import { provideRouter, RouterConfig } from '@angular/router';

import { AllBooksComponent } from './all-books/all-books.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: RouterConfig = [
  { path: '', component: AllBooksComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'my-books', component: MyBooksComponent },
  { path: 'settings', component: SettingsComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];