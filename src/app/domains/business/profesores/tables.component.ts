import { Component, EventEmitter, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherDTO } from '../../shared/models/teacherDTO.model';
import { TeacherDTService } from '../../shared/services/teacher.service';



@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export default class TablesComponent {


  @Input({required: true}) teachersDTO!: TeacherDTO;

  teacherDTO: TeacherDTO[] = [];
  
  private teacherDTOService = inject(TeacherDTService);

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
  
}
