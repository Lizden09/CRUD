import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TownService {

  private URL = 'http://localhost:4201/municipios';

  constructor(private http: HttpClient) { }

  getTowns(departamentoId: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/departamento/${departamentoId}`);
  }

  getAllTowns(): Observable<any> {
    return this.http.get<any>(this.URL);
  }

  addTown(town: { name: string }): Observable<any> {
    return this.http.post(this.URL, town);
  }

  updateTown(townId: number, town: {
    nombre?: string}): Observable<any> {
    return this.http.put(`${this.URL}/${townId}`, town);
  }

  deleteTown(townId: number): Observable<any> {
    return this.http.delete(`${this.URL}/${townId}`);
  }
}
