import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class AuthService {
  data: Object;
  isLoggedIn = false;

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

  authCheck(): any {
    this.http.request('/api/auth', new RequestOptions({
      headers: new Headers({'x-access-token': localStorage.getItem('minimean-token'),
                            'Content-Type': 'application/json'})
    }))
      .subscribe((res: Response) => {
        this.data = res.json();
        this.isLoggedIn = res.json().authenticated;
      });
      return this.isLoggedIn;
  }
//  isLoggedIn(): any {
  //   this.http.request('/api/auth', new RequestOptions({
  //     headers: new Headers({'x-access-token': localStorage.getItem('minimean-token'),
  //                           'Content-Type': 'application/json'})
  //   }))
  //     .subscribe((res: Response) => {
  //       return res.json().authenticate;
  //     });
  // }
  logOut() {
    localStorage.removeItem('minimean-token');
    this.authCheck();
  }
}
