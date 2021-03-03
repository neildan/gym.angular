import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';
import { User } from '../models/user';
import { UserEdit } from '../models/userEdit';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = GlobalConstants.apiURL + '/users/';

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<any> {
    return this.http.get(this.url + id)
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  updateUser(id: string, user: UserEdit): Observable<any> {
    return this.http.put(this.url + id, user)
  }
}
