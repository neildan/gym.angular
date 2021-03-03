import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  url = GlobalConstants.apiURL + '/cities/'

  constructor(private http: HttpClient) { }

  getCity(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  getCities(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteCity(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveCity(city: City): Observable<any> {
    return this.http.post(this.url, city);
  }

  updateCity(id: string, city: City): Observable<any> {
    return this.http.put(this.url + id, city)
  }
}
