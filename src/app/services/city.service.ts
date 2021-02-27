import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  //FIXME: change the url to city
  url = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getCity(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  getCities(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteCity(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  saveCity(city: City): Observable<any> {
    return this.http.post(this.url, city);
  }

  updateCity(id: string, city: City): Observable<any> {
    return this.http.put(this.url + '/' + id, city)
  }
}
