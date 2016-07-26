import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class AuthService {
  data: Object;
  loggedIn = false;

  constructor(public http: Http) {
    this.loggedIn = !!localStorage.getItem('minimean-token');
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
        return this.data;
      });
  }

  authCheck(): any {
//    let headers = new Headers();
//    headers.append('Content-Type', 'application/json');
//    headers.append('x-access-token', localStorage.getItem('minimean-token'));
//    this.data = localStorage.getItem('minimean-token');
    this.http.request('/api/auth', new RequestOptions({
      headers: new Headers({'x-access-token': localStorage.getItem('minimean-token'), 'Content-Type': 'application/json'})
    }))
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loggedIn = res.json().authenticated;
      });
  }
  logOut() {
    localStorage.removeItem('minimean-token');
  }
}
