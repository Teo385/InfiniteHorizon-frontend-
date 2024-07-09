import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherDTO } from '../../shared/models/teacherDTO.model';
import { TeacherDTService } from '../../shared/services/teacher.service';
import { StudentDTOservice } from '../../shared/services/student.service';
import { StudentDTO } from '../../shared/models/studentDTO.model';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export default class TablesComponent {

  @Input({required: true}) teachersDTO!: TeacherDTO;

  teacherDTO: TeacherDTO[] = [];
  studentDTO: StudentDTO[] = [];
  cursoSeleccionado: string | null = null;


  private teacherDTOService = inject(TeacherDTService);
  private studentDTOservice = inject(StudentDTOservice);

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher() {
    this.teacherDTOService.getTeacher().subscribe(teacherDTO => {
      this.teacherDTO = teacherDTO;
    });
  }

  getProfileImage(fkIdUsuario: number): string {
    return `https://picsum.photos/id/${fkIdUsuario}/200/200`;
  }

  obtenerEstudiantesPorCurso(nombresCursos: string) {
    this.studentDTOservice.obtenerEstudiantesPorCurso(nombresCursos).subscribe(studentDTO => {
      this.studentDTO = studentDTO;
      this.cursoSeleccionado = nombresCursos;
    });
  }

  abrirModal(curso: string) {
    this.obtenerEstudiantesPorCurso(curso);
  }

  cerrarModal() {
    this.cursoSeleccionado = null;
    this.studentDTO = [];
  }

}
