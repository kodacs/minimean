import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';

@Component({
  moduleId: module.id,
  selector: 'login-component',
  directives: [MD_BUTTON_DIRECTIVES],
  template: `{{title}}
  <button md-raised-button color="primary">this is a magical button</button>
  <h2>Basic Request</h2>
<button type="button" (click)="makeRequest()">Make Request</button>
<button type="button" (click)="makePost()">Make Post</button>
<button type="button" (click)="authCheck()">Check</button>
<button type="button" (click)="logOut()">Logout</button>
<div *ngIf="loading">loading...</div>
<pre>{{data | json}}</pre>
  `
})


export class LoginComponent {
  title = 'login works!';
  data: Object;
  loading: boolean;

  constructor(public http: Http) {

  }



  makeRequest(): void {
    this.loading = true;
      this.http.request('/api/auth/setup')
        .subscribe((res: Response) => {
          this.data = res.json();
          this.loading = false;
        });

  }
  makePost(): void {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let payload = JSON.stringify({
      name: '1',
      password: '1'
    });

    this.loading = true;
    this.http.post('/api/auth', payload, {headers: headers})
      .subscribe((res: Response) => {
        this.data = res.json();
        localStorage.setItem('minimean-token', res.json().token);
        this.loading = false;
      });
  }
  authCheck(): void {
    this.data = localStorage.getItem('minimean-token');
  }
  logOut(): void {
    localStorage.removeItem('minimean-token');
  }
}
