import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  moduleId: module.id,
  selector: 'log-in',
  templateUrl: 'log-in.component.html',
  styleUrls: ['log-in.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class LogInComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() { }

  login(username: HTMLInputElement, password: HTMLInputElement) {
    let usernameTxt = username.value;
    let passwordTxt = password.value;
    if (usernameTxt.length < 1 || passwordTxt.length < 1) return;
    this.authService.handleAuthLogging('login', usernameTxt, passwordTxt)
                    .then(res => {
                      console.log(res);
                      username.value = '';
                      password.value = '';
                    });
  }

}