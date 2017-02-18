import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProjectsRootResolver implements Resolve<any> {
  constructor() { }

  resolve(_0: ActivatedRouteSnapshot, _1: RouterStateSnapshot): Observable<any> {
    return Observable.of(true);
  }
}