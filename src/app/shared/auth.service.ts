import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/toPromise";

import { User, Credentials } from './user.model';
import { handleError, parseJson, packageForPost } from './http-helpers';

@Injectable()
export class AuthService {

  creds: Credentials = {loggedIn: false, user: null};
  logEvent = new EventEmitter<Credentials>();

  constructor(private http: Http) { }

  checkCreds() {
    return this.http
                .get('/auth/checkCreds')
                .toPromise()
                .then(parseJson)
                .then(res => {
                  this.creds = res;
                  return res;
                })
                .catch(handleError);
  }

  handleAuthLogging(logType: string, username: string, password: string) {
    let body = JSON.stringify({
      username: username,
      password: password
    });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
    return this.http
              .post(`/auth/${logType}`, body, options)
              .toPromise()
              .then(parseJson)
              .then(res => {
                if (logType === 'login') {
                  if (res.message === 'Username not found' ||
                      res.message === 'Incorrect password') return res;
                  this.creds = {
                    loggedIn: true,
                    user: res.userFormatted
                  };
                  this.logEvent.emit(this.creds);
                }
                return res;
              })
              .catch(handleError);
  }

  logout() {
    return this.http
              .get('/auth/logout')
              .toPromise()
              .then(res => {
                this.creds = {loggedIn: false, user: null};
                this.logEvent.emit(this.creds);
                return res;
              })
              .catch(handleError);
  }

  updateProfile(name: string, city: string, state: string) {
    this.creds.user.name = name;
    this.creds.user.city = city;
    this.creds.user.state = state;
    let dataPkg = packageForPost(this.creds.user);
    return this.http
                .post('/auth/profile', dataPkg.body, dataPkg.options)
                .toPromise()
                .then(parseJson)
                .catch(handleError);
  }

}