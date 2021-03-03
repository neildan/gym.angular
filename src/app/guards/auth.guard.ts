import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalService } from '../services/localService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _localService: LocalService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let isLoggedIn = this._localService.getJsonValue('user-token');
    if (!isLoggedIn) {
      this.toastr.error("Debe ingresar sus credenciales primero", "¡Acceso denegado!")
      this.router.navigate(['/login'])
    }
    return true;
  }

}
