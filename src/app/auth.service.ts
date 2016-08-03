import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {

  isLoggedIn = new BehaviorSubject(false);
  loggedin = false;

  constructor(private _http: Http, private _router: Router) { }

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
//        this._router.navigate(['/app']);
      });
  }

  authUserGuard(next, state): any {
    return new Promise((resolve) => {
      this.check()
        .subscribe((result) => {
          console.log(result);
          if (result) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  login(username, password) {
    console.log('login', username, password);

    this._http.post('/api/auth', JSON.stringify({
      'name': username,
      'password': password
    }), new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json'})
    }))
    .map(response => {
      console.log(JSON.stringify(response.json()));
      return response.json();
    })
    .subscribe(data => {
      if (data.success === true) {
        localStorage.setItem('minimean-token', data.token);
        console.log('jo');
        this.loggedin = true;
      } else {
        this._router.navigate(['/login']);
        this.loggedin = false;
        console.log('nemjo');
      }
    });
  }
  logout() {
    this.loggedin = false;
  }
  check() {
    console.log(Observable.of(this.loggedin));

    return Observable.of(this.loggedin);
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
          this.loggedin = true;
        } else {
//          this.logOut();
          this.loggedin = false;
        }
      });
  }

  authCheck(): any {
  }

  logOut() {
    localStorage.removeItem('minimean-token');
    this.isLoggedIn.next(false);
    this._router.navigate(['/login']);
  }
}
