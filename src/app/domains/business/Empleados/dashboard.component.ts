import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { Empleado } from '../../shared/models/employee.model';
import { EmpleadoService } from '../../shared/services/employee.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default class DashboardComponent {


  @Input({required: true}) employee!: Empleado;

  empleado: Empleado[] = [];
  
  private empleadoService = inject(EmpleadoService);

  ngOnInit() {
    this.getEmpleado();
  }

  getEmpleado() {
    this.empleadoService.getEmpleado().subscribe(employees => {
      this.empleado = employees;
    });
  }

  getProfileImage(fkIdUsuario: number): string {
    return `https://picsum.photos/id/${fkIdUsuario}/200/200`;
  }
  
}
