import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalService } from '../services/localService';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

  constructor(
    private _localService: LocalService,
    private toastr: ToastrService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let isLoggedIn = this._localService.getJsonValue('user-token');
    if (isLoggedIn) {
      this.toastr.error("Debe cerrar sesión", "¡Acceso denegado!")
      this.router.navigate(['/home'])
    }
    return true;
  }

}
