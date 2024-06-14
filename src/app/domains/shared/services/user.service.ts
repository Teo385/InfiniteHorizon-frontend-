import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/usuario'
    
  constructor() { }
 
  getUsers () {
    const url = new URL(`${this.baseUrl}/all`)
    return this.http.get<User[]>(url.toString());
  }
 
  getUserById (idUsuario?: number) {
    return this.http.get<User[]>(`${this.baseUrl}/id/${idUsuario}`)
    .pipe(map((user) => user[0]));
  }

  buscarPersona(nombreCompleto: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/buscar/${nombreCompleto}`);
  }

  saveUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return new Observable(observer => {
      this.http.post<any>(`${this.baseUrl}/save`, user, { headers: headers })
        .subscribe({
          next: (response) => {
            observer.next(response);
          },
          error: (error) => {
            observer.error(error);
          },
          complete: () => {
            observer.complete();
          }
        });
    });
  }


  deleteUser(idUsuario: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${idUsuario}`);
  }

  updateUser(idUsuario: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update/${idUsuario}`, user);
  }
  
}
