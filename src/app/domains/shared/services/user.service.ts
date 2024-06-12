import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
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
}
