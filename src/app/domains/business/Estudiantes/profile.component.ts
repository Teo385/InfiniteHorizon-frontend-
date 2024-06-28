import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDTO } from '../../shared/models/studentDTO.model';
import { StudentDTOservice } from '../../shared/services/student.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,  ModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {

  @Input({required: true}) studentsto!: StudentDTO;

  studentdto: StudentDTO[] = [];
  estudianteSeleccionado:  StudentDTO| null = null;

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

  abrirModal(estudiante: StudentDTO): void {
    this.estudianteSeleccionado = estudiante;
  }

  cerrarModal(): void {
    this.estudianteSeleccionado = null;
  }
  
}
