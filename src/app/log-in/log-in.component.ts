import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  moduleId: module.id,
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class LogInComponent implements OnInit {

  toastText: string = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() { }

  login(username: HTMLInputElement, password: HTMLInputElement) {
    let usernameTxt = username.value;
    let passwordTxt = password.value;
    if (usernameTxt.length < 1 || passwordTxt.length < 1) return;
    this.authService.handleAuthLogging('login', usernameTxt, passwordTxt)
                    .then(res => {
                      username.value = '';
                      password.value = '';
                      if (res.message === 'Username not found') {
                        this.toast('No such user!');
                      } else if (res.message === 'Incorrect password') {
                        this.toast('Incorrect password!');
                      } else {
                        this.router.navigate(['/my-books']);
                      }
                    });
  }

  /** Show a notification message */
  toast(text: string) {
    this.toastText = text;
    window.setTimeout(() => this.toastText = null, 2000);
  }

}