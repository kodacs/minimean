import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {

  isLoggedIn = new BehaviorSubject(false);

  constructor(private _http: Http, private _router: Router) {
  }

  userLogin(username, password): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let payload = JSON.stringify({
      'name': username,
      'password': password
    });
    this._http.post('/api/auth', payload, { headers: headers })
      .subscribe((res: Response) => {
        localStorage.setItem('minimean-token', res.json().token);
        this.authUpdate();
        this._router.navigate(['/app']);
      });
  }

  authCheckGuard(): Observable<boolean> | boolean {
    let obs;
    try {
      obs = this._http.request('/api/auth', new RequestOptions({
        headers: new Headers({
          'x-access-token': localStorage.getItem('minimean-token'),
          'Content-Type': 'application/json'
        })
      }))
        .map(result => result.json())
        .map(resultJson => (resultJson && resultJson.authenticated));
    } catch (err) {
      obs = Observable.of(false);
    }
    return obs;
  }

  authUpdate(): any {
    this._http.request('/api/auth', new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('minimean-token')})
      }))
      .map(response => response.json())
      .subscribe(data => {
        if (data.authenticated === true) {
          this.isLoggedIn.next(true);
        } else {
          this.logOut();
        }
      });
  }

  authCheck(): any {
    return this.isLoggedIn;
  }

  logOut() {
    localStorage.removeItem('minimean-token');
    this.isLoggedIn.next(false);
    this._router.navigate(['/login']);
  }
}
