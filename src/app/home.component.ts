import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-component',
  template: '{{title}}'
})

export class HomeComponent {
  title = 'home works!';
}
