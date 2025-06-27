import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {
private URL = 'http://localhost:4201/colaboradores';

  constructor(private http: HttpClient) { }

  getPersons(): Observable<any> {
    return this.http.get<any>(this.URL);
  }

  addPerson(person: { empresaId:number, nombreCompleto: string, edad: number, telefono: string, correo: string}): Observable<any> {
    return this.http.post(this.URL, person);
  }

  updatePerson(personId: number, person: { empresaId:number, nombreCompleto: string, edad: number, telefono: string, correo: string}): Observable<any> {
    return this.http.put(`${this.URL}/${personId}`, person);
  }

  deletePerson(personId: number): Observable<any> {
    return this.http.delete(`${this.URL}/${personId}`);
  }
}
