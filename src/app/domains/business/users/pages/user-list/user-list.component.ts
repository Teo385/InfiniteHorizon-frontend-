import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../../../shared/services/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export default class UserListComponent {
  @Input({ required: true }) user!: User;

  users = signal<User[]>([]);
  private userService = inject(UserService);
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchTerm: new FormControl('')
    });
  }

  // searchUsers() {
  //   const searchTerm = this.searchForm.get('searchTerm')?.value;
  //   if (searchTerm) {
  //     this.userService.searchUsers(searchTerm).subscribe(users => {
  //       this.users.set(users);
  //     });
  //   } else {
  //     this.getUsers();
  //   }
  // }

  ngOnInit(): void {
    this.getUsers();
    this.searchForm = this.formBuilder.group({
      nombre: [''],
      apellido: ['']
    }); 
  }

  // buscarUsuarios(): void {
  //   const nombreControl = this.searchForm.get('nombre');
  //   const apellidoControl = this.searchForm.get('apellido');
  
  //   if (nombreControl && apellidoControl) {
  //     const nombre = nombreControl.value;
  //     const apellido = apellidoControl.value;
  //     this.userService.buscar(nombre, apellido);
  //   } else {
  //     console.error('Error: No se pudo obtener el control del formulario.');
  //   }
  // }

  private getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users.set(users);
    });
  }

  

  getProfileImage(idUsuario: number): string {
    return `https://picsum.photos/id/${idUsuario}/200/200`;
  }

  
}


  // getProfileImage(): string {
  //   return `https://picsum.photos/id/${this.getRandomInt(1,1000)}/200/200`;;
  // }

  // getRandomInt(min: number, max: number): number {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  //   this.http.get<User[]>('http://localhost:8080/api/usuario/all')
  //     .subscribe((users: User[]) => {
  //       users.forEach((user: User) => {
  //         const profileImageUrl = this.getProfileImage(user.idUsuario);
  //         console.log('URL de la imagen de perfil:', profileImageUrl);
  //       });
  //     });
  // } 

