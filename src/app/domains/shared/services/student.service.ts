import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentDTO } from '../models/studentDTO.model';
import { Estudiante } from '../models/student.model';


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

  getStudent() {
    const url = new URL(`http://localhost:8080/api/estudiante/all`)
    return this.http.get<Estudiante[]>(url.toString());
  }





}