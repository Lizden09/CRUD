import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  private URL = 'http://localhost:4201/paises';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.URL);
  }

  addCountry(country: { name: string}): Observable<any> {
    return this.http.post(this.URL, country);
  }

  updateCountry(countryId: number, country: { nombre?: string}): Observable<any> {
    return this.http.put(`${this.URL}/${countryId}`, country);
  }

  deleteCountry(countryId: number): Observable<any> {
    return this.http.delete(`${this.URL}/${countryId}`);
  }
}
