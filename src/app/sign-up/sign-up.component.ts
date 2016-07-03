import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  moduleId: module.id,
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SignUpComponent implements OnInit {

  toastText: string = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() { }

  signup(username: HTMLInputElement, password: HTMLInputElement) {
    let usernameTxt = username.value;
    let passwordTxt = password.value;
    if (usernameTxt.length < 1 || passwordTxt.length < 1) return;
    this.authService.handleAuthLogging('signup', usernameTxt, passwordTxt)
                    .then(res => {
                      username.value = '';
                      password.value = '';
                      if (res.message === 'Username taken'){
                        this.toast('Username taken');
                      }
                      else {
                        this.toast(res.message);
                        this.router.navigate(['/log-in']);
                      }
                    });
  }

  /** Show a notification message */
  toast(text: string) {
    this.toastText = text;
    window.setTimeout(() => this.toastText = null, 2000);
  }

  
}