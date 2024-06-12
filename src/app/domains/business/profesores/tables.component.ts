import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export default class TablesComponent {
  private userService = inject(UserService);

  nombreCompleto: string = '';
  usuariosFiltrados: User[] = [];
  personas$!: Observable<User[]>;

  
  buscar() {
    if (this.nombreCompleto.trim() !== '') {
      this.personas$ = this.userService.buscarPersona(this.nombreCompleto);
      this.personas$.subscribe(users => {
        this.usuariosFiltrados = users; 
        console.log('Estoy en el filtro')
        console.log(users)
      });
    } else {
      this.usuariosFiltrados = this.users; 
      console.log('Estoy sin filtro')
      console.log(this.users)
    }
  }

  /* ------------------------------------------------------------------------- */

  getProfileImage(idUsuario: number): string {
    return `https://picsum.photos/id/${idUsuario}/200/200`;
  }

  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  

  @Input({required: true}) user!: User;
  
  users: User[] = [];
  

  
  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.usuariosFiltrados = users;
    });
    
  }

  ngOnInit() {
    this.getUsers();
  }
  }

  

