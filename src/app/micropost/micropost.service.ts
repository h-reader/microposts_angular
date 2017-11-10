import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';
import { Micropost } from './micropost';


@Injectable()
export class MicropostService {

  constructor(private http: Http) { }

  /**
   * つぶやきを投稿する
   * @param body つぶやき情報
   */
  postMicropost(body: any): Promise<boolean> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(environment.API_URL + '/microposts', body, options)
    .toPromise().then(response => {
      console.log(response.json().data);
      return true;
    })
    .catch();
  }

}
