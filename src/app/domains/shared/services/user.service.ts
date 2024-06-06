import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../models/user.model';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private http = inject(HttpClient);
 
  constructor() { }
 
  getUsers () {
    const url = new URL('http://localhost:8080/api/usuario/all')
    return this.http.get<User[]>(url.toString());
  }
 
  getUserById (idUsuario?: number) {
    return this.http.get<User[]>(`http://localhost:8080/api/usuario/id/${idUsuario}`)
    .pipe(map((user) => user[0]));
  }
}