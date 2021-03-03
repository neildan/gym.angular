import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';
import { AuthLogin } from '../models/authLogin';
import { AuthRegister } from '../models/authRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = GlobalConstants.apiURL + '/auth/';

  constructor(private http: HttpClient) { }

  register(register: AuthRegister): Observable<any> {
    return this.http.post(this.url + 'register', register)
  }

  login(login: AuthLogin): Observable<any> {
    return this.http.post(this.url + 'login', login)
  }
}
