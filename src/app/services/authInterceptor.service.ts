import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from './localService';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _localService: LocalService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this._localService.getJsonValue('user-token');
    var request = req;

    if (token) {
      const headers = new HttpHeaders({
        'user-token': token
      });
      request = req.clone({ headers });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let response = event.body;
          let titleError = '', redirect = '', msj = '';

          if (!response.state && (response.code == 401 || response.code == 405)) {
            if (response.code == 401) {
              titleError = "Error de autenticación";
              msj = 'Llene el formulario de ingreso';
              redirect = '/login';
            } else if (response.code == 405) {
              titleError = "Permiso denegado";
              msj = response.msj;
              redirect = '/home';
            }
            this.toastr.error(msj, titleError);
            this.router.navigateByUrl(redirect);
          }
        }
        return event;
      }));
  }
}
