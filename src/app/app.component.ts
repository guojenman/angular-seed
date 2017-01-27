import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jm-app',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(router: Router) {
    router.initialNavigation();
  }
}