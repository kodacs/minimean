import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
  isLoggedIn: boolean;

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
        this.authCheck();
        this._router.navigate(['/app']);
      });
  }

  authCheck(): Observable<boolean> | boolean {
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
      this.isLoggedIn = obs;
      obs = Observable.of(false);
    }
    this.isLoggedIn = obs;
    return obs;
  }

  logOut() {
    localStorage.removeItem('minimean-token');
    this.authCheck();
    this._router.navigate(['/login']);
  }
}
