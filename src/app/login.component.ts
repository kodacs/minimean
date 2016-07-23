import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';

@Component({
  moduleId: module.id,
  selector: 'login-component',
  directives: [MD_BUTTON_DIRECTIVES],
  template: `{{title}}
  <button md-raised-button color="primary">this is a magical button</button>
  <h2>Basic Request</h2>
<button type="button" (click)="makeRequest()">Make Request</button>
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
      this.http.request('http://jsonplaceholder.typicode.com/posts/1')
        .subscribe((res: Response) => {
          this.data = res.json();
          this.loading = false;
        });

  }
}
