import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero, User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';


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
  users: User[] = [];
  
   /* ------------------------------------------------------------------------- */

  user: User = {
    idUsuario: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    contrasena: '',
    fechaNacimiento: new Date(),
    genero: Genero.M,
    direccion: '',
    correo: '',
    telefono: '',
  };


  confirmacionContrasena: string = '';

  passwordsMatch(): boolean {
    return this.user.contrasena === this.confirmacionContrasena;
  }

  saveUser(): void {
    if (this.passwordsMatch()) {
      this.userService.saveUser(this.user)
        .subscribe({
          next: (response) => {
            console.log('Usuario guardado correctamente', response);
            this.closeModal()
          },
          error: (error) => {
            console.error('Error al guardar el usuario', error);
          }
        });
    } else {
      console.error('Las contraseñas no coinciden.');
    }
  }

   /* ------------------------------------------------------------------------- */

   deleteUser(userId: number) {
    if (confirm('Estas seguro que quieres eliminar este usuario?')) {
        this.userService.deleteUser(userId)
            .subscribe({
                next: () => {
                    console.log('Usuario borrado');
                    this.getUsers();
                    
                    alert('Usuario borrado');
                },
                error: (error) => {
                    console.error('Error deleting user', error);
                }
            });
    }
}


   /* ------------------------------------------------------------------------- */

  buscar() {
    if (this.nombreCompleto.trim() !== '') {
      this.personas$ = this.userService.buscarPersona(this.nombreCompleto);
      this.personas$.subscribe(users => {
        this.usuariosFiltrados = users;
      });
    } else {
      this.usuariosFiltrados = this.users; 
    }
  }

 /* ------------------------------------------------------------------------- */


  modalVisible: boolean = false;

  openModal() {
    this.modalVisible = true;
    console.log("abrir")
  }

  closeModal() {
    this.modalVisible = false;
  }


  

  /* ------------------------------------------------------------------------- */

  getProfileImage(idUsuario: number): string {
    return `https://picsum.photos/id/${idUsuario}/200/200`;
  }


  /* ------------------------------------------------------------------------- */

  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  
  /* ------------------------------------------------------------------------- */

  
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

  

