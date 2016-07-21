import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'home',
  template: '{{title}}'
})
export class HomeComponent {
  title = 'home works!';
}
