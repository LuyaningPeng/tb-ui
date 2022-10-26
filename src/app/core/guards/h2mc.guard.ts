import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {H2mcService} from '@core/services/h2mc.service';

@Injectable({
  providedIn: 'root'
})
/*
拒绝访问accessDenied中的路由
 */
export class H2mcGuard implements CanActivateChild {
  private accessDenied = [
    // 'auditLogs','settings','ruleChains','assets','deviceProfiles','otaUpdates','entityViews',
    // 'edgeInstances','widgets-bundles','usage'
  ];

  constructor(private h2mcService: H2mcService) {
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (childRoute.url.length !== 0) {
      if (this.accessDenied.indexOf(childRoute.url[0].path) !== -1) {
        alert('该路由拒绝访问，请返回');
        console.log(childRoute.url);
        this.h2mcService.denyAccess();
        return of(false);
      }
    }

    return true;
  }

}
