import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StudentDTO } from '../../models/studentDTO.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  
  @Input() estudiante: StudentDTO | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal()  {
    this.estudiante = null;
    this.close.emit();
  }
}
