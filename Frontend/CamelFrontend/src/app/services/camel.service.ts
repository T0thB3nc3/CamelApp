import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Camel {
  id?: number;
  name: string;
  humpCount: number;
  color?: string;
  lastFed?: Date;
}

@Injectable({providedIn: 'root'})
export class CamelService {
  private apiUrl = environment.apiUrl;

  private editSubject = new Subject<Camel>();
  edit$ = this.editSubject.asObservable();

  constructor(private http: HttpClient) { }

  selectForEdit(camel: Camel) {
    this.editSubject.next(camel);
  }

  getCamels(): Observable<Camel[]> {
    return this.http.get<Camel[]>(`${this.apiUrl}/camels`);
  }

  getCamel(id: number): Observable<Camel> {
    return this.http.get<Camel>(`${this.apiUrl}/camels/${id}`);
  }

  createCamel(camel: Camel): Observable<Camel> {
    return this.http.post<Camel>(`${this.apiUrl}/camels`, camel);
  }

  feedCamel(id: number): Observable<Camel> {
    return this.http.post<Camel>(`${this.apiUrl}/camels/${id}/feed`, {});
  }

  updateCamel(id: number, camel: Camel): Observable<Camel> {
    return this.http.put<Camel>(`${this.apiUrl}/camels/${id}`, camel);
  }

  deleteCamel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/camels/${id}`);
  }
}
