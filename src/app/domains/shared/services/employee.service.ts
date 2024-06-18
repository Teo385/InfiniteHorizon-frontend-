import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/empleadoDto'

  constructor() { }

  getEmpleado() {
    const url = new URL(`${this.baseUrl}/all`)
    return this.http.get<Empleado[]>(url.toString());
  }

  

}