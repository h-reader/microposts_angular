import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../../environments/environment';
import { Micropost } from './micropost';


@Injectable()
export class MicropostService {

  private MICROPOST_URL = '/microposts';

  /** つぶやき変更通知 */
  editMicropost$: BehaviorSubject<boolean>;

  constructor(private http: Http) {
    this.editMicropost$ = new BehaviorSubject<boolean>(false);
  }

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
      this.editMicropost$.next(true);
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

  /**
   * つぶやきを削除する
   * @param id 削除対象のMicropostId
   */
  deleteMicropost(id: Number): Promise<boolean> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.API_URL + this.MICROPOST_URL + '/' + id.toString(), options)
    .toPromise().then(response => {
      console.log(response.json());
      this.editMicropost$.next(true);
      return true;
    });

  }
}
