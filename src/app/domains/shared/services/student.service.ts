import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentDTO } from '../models/studentDTO.model';
import { Estudiante } from '../models/student.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentDTOservice {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/estudianteDto'

  constructor() { }

  getStudentdto() {
    const url = new URL(`${this.baseUrl}/all`)
    return this.http.get<StudentDTO[]>(url.toString());
  }

  obtenerEstudiantesPorCurso(nombresCursos: string): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${this.baseUrl}/curso/${nombresCursos}`);
  }





}