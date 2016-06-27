import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/toPromise";

import { User, Credentials } from './user.model';
import { handleError, parseJson } from './http-helpers';

@Injectable()
export class AuthService {

  creds: Credentials = null;

  constructor(private http: Http) { }

  handleAuthLogging(username, password) {
    
  }

}