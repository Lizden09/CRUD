import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private URL = 'http://localhost:4201/departamentos';

  constructor(private http: HttpClient) { }

  getStates(paisId: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/pais/${paisId}`);
  }

  getAllStates(): Observable<any> {
    return this.http.get<any>(this.URL);
  }

  addState(state: { name: string }): Observable<any> {
    return this.http.post(this.URL, state);
  }

  updateState(stateId: number, state: {
    nombre?: string}): Observable<any> {
    return this.http.put(`${this.URL}/${stateId}`, state);
  }

  deleteState(stateId: number): Observable<any> {
    return this.http.delete(`${this.URL}/${stateId}`);
  }
}
