import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from './shared/auth.service';
import { BooksService } from './shared/books.service';
import { Credentials, User } from './shared/user.model';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, AuthService, BooksService]
})
export class AppComponent implements OnInit {

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

  ngOnInit() {
    this.authService.checkCreds()
        .then(res => {
          this.creds = res;
        });
  }

  logout() {
    this.authService.logout();
  }

}