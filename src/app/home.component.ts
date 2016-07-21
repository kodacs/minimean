import { Component } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';

@Component({
  moduleId: module.id,
  selector: 'home',
  directives: [MD_BUTTON_DIRECTIVES],
  template: `{{title}}
  <button md-raised-button color="primary">this is a magical button</button>
  `
})
export class HomeComponent {
  title = 'home works!';
}
