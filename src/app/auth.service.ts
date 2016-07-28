import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthService {
  data: Object;

  constructor(public http: Http) {
  }
  resetFirstAdmin() {
    this.http.request('/api/auth/setup')
      .subscribe((res: Response) => {
        this.data = res.json();
        return this.data;
      });
  }
  mockLogin(): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let payload = JSON.stringify({
      name: 'defaultuser',
      password: 'reparetekmogyoro'
    });
    this.http.post('/api/auth', payload, { headers: headers })
      .subscribe((res: Response) => {
        this.data = res.json();
        localStorage.setItem('minimean-token', res.json().token);
        console.log(this.data);
        this.authCheck();
        return this.data;
      });
  }

  userLogin(username, password): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let payload = JSON.stringify({
      'name': username,
      'password': password
    });
    this.http.post('/api/auth', payload, { headers: headers })
      .subscribe((res: Response) => {
        this.data = res.json();
        localStorage.setItem('minimean-token', res.json().token);
        console.log(this.data);
        this.authCheck();
        return this.data;
      });
  }

  authCheck(): any {
    this.http.request('/api/auth', new RequestOptions({
      headers: new Headers({'x-access-token': localStorage.getItem('minimean-token'),
                            'Content-Type': 'application/json'})
    }))
      .subscribe((res: Response) => {
        this.data = res.json();
        this.isLoggedIn = res.json().authenticated;
        console.log('syncauth ' + this.isLoggedIn);
      });
      console.log('asyncauth ' + this.isLoggedIn);
      return this.isLoggedIn;
  }
  isLoggedIn(): Observable<boolean> | boolean {
    let obs;
    try {
      obs = this.http.request('/api/auth', new RequestOptions({
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
  logOut() {
    localStorage.removeItem('minimean-token');
    this.authCheck();
  }
}
