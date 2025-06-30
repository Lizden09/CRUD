import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    private URL = 'http://localhost:4201/empresas';

  constructor(private http: HttpClient) { }

  getCompany(): Observable<any> {
    return this.http.get<any>(this.URL);
  }

  addCompany(company: { name: string}): Observable<any> {
    return this.http.post(this.URL, company);
  }

}
