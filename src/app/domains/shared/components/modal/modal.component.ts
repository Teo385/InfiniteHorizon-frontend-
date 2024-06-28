import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StudentDTO } from '../../models/studentDTO.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  
  @Input() estudiante: any;
  studentdto: StudentDTO[] = [];

  closeModal()  {
    this.estudiante = null;
  }
}


