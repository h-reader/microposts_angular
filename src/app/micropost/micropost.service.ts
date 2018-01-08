import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';
import { Micropost } from './micropost';


@Injectable()
export class MicropostService {

  constructor(private http: Http) { }

  private MICROPOST_URL = '/microposts';

  /**
   * つぶやきを投稿する
   * @param body つぶやき情報
   */
  postMicropost(body: any): Promise<boolean> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    console.log(body);
    return this.http.post(environment.API_URL + this.MICROPOST_URL, body, options)
    .toPromise().then(response => {
      console.log(response.json());
      return true;
    })
    .catch();
  }

  /**
   * つぶやきを取得する
   * @param userId 対象のユーザID
   */
  getMicropost(userId: Number): Promise<Micropost[]> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(environment.API_URL + '/user/' + userId.toString() + this.MICROPOST_URL, options)
    .toPromise().then(response => {
      console.log(response.json());
      return response.json() as Micropost[];
    });
  }

}
