import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TeacherDTO } from '../models/teacherDTO.model';


@Injectable({
  providedIn: 'root'
})
export class TeacherDTService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/profesorDto'

  constructor() { }

  getTeacher() {
    const url = new URL(`${this.baseUrl}/all`)
    return this.http.get<TeacherDTO[]>(url.toString());
  }

  

}