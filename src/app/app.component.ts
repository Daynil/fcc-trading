import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from './shared/auth.service';
import { Credentials, User } from './shared/user.model';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, AuthService]
})
export class AppComponent {

  creds: Credentials = {loggedIn: false, user: null};

  constructor(private authService: AuthService) {
    this.authService.logEvent.subscribe( (newCreds: Credentials) => {
      let curUser: User = newCreds.user ? newCreds.user : null;
      this.creds = {
        loggedIn: newCreds.loggedIn,
        user: curUser
      };
      console.log(this.creds);
    })
  }

  logout() {
    this.authService.logout();
  }

}