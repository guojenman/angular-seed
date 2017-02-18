import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import './rxjs.imports';

@Component({
  selector: 'jm-app',
  template: `
    <div style="position: absolute; top: 0; width: 100%; height: 40px; border-bottom: 1px solid #fefefe; background-color: #333;">header placeholder</div>
    <router-outlet></router-outlet>
  `,
  styleUrls: [
    '../css/reset.scss',
    './app.component.scss'
  ]
})
export class AppComponent {

  constructor(public router: Router) {
    let busyHandler: Function;
    router.events.subscribe(event => {

    });
    // router.initialNavigation();
  }
}