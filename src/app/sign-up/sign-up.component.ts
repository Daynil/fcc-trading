import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  moduleId: module.id,
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  signup(username: HTMLInputElement, password: HTMLInputElement) {
    let usernameTxt = username.value;
    let passwordTxt = password.value;
    if (usernameTxt.length < 1 || passwordTxt.length < 1) return;
    this.authService.handleAuthLogging('signup', usernameTxt, passwordTxt)
                    .then(res => {
                      console.log(res);
                      username.value = '';
                      password.value = '';
                    });
  }

  
}