import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import { environment } from '../../../environments/environment';
import { User } from '../../user/user'


@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  logIn(body: any): Promise<User> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(environment.API_URL + '/auth/sign_in', body, options)
    .toPromise().then(response => {response.json().data as User})
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
