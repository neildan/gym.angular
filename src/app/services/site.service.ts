import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../common/global-constants';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  url = GlobalConstants.apiURL + '/sites/';

  constructor(private http: HttpClient) { }

  getSite(id: string): Observable<any> {
    return this.http.get(this.url + id)
  }

  getSites(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteSite(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveSite(city: Site): Observable<any> {
    return this.http.post(this.url, city);
  }

  updateSite(id: string, site: Site): Observable<any> {
    return this.http.put(this.url + id, site)
  }
}
