import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StudentDTO } from '../../shared/models/studentDTO.model';
import { Estudiante } from '../../shared/models/student.model';
import { StudentDTOservice } from '../../shared/services/student.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {

  @Input({required: true}) studentsto!: StudentDTO;

  studentdto: StudentDTO[] = [];
  student = signal<Estudiante[]> ([]);

  private studentDTOservice = inject(StudentDTOservice);

  ngOnInit() {
    this.getStudentDTOs();
  }

  getStudentDTOs() {
    this.studentDTOservice.getStudentdto().subscribe(studentdto => {
      this.studentdto = studentdto;
    });
  }

  getProfileImage(fkIdUsuario: number): string {
    return `https://picsum.photos/id/${fkIdUsuario}/200/200`;
  }
  
}
