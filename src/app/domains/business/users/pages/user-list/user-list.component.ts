import { Component, EventEmitter, inject, Input, Output, signal, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { User, Genero } from '../../../../shared/models/user.model';
import { UserService } from '../../../../shared/services/user.service';


  @Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css'
  })
  
  export default class UserListComponent implements OnInit {

    users: User[] = [];
    userForm: FormGroup;
    modalVisible: boolean = false;
    modalVisibleA: boolean = false;
    selectedUserId: number | null = null;
  

    /* ------------------------------------------------------------------------- */
  
    
    getUsers() {
      this.userService.getUsers().subscribe(users => {
        this.users = users;
        this.usuariosFiltrados = users;
      });
      
    }
    
  
    ngOnInit() {
      this.getUsers();
      this.loadUsers();
    }
 

    /* ------------------------------------------------------------------------- */
  
    constructor(
      private fb: FormBuilder,
    ) {
      this.userForm = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        cedula: ['', Validators.required],
        contrasena: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        genero: ['', Validators.required],
        direccion: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required]
      });
    }
  
  
    loadUsers() {
      this.userService.getUsers().subscribe(users => {
        this.users = users;
      });
    }
  
  
    onSubmit() {
      if (this.userForm.valid && this.selectedUserId !== null) {
        const updatedUser = { idUsuario: this.selectedUserId, ...this.userForm.value };
        this.userService.updateUser(this.selectedUserId, updatedUser).subscribe(response => {
          this.loadUsers();
          this.closeModal();
          alert('El usuario fue editado correctamente')
        }, error => {
          console.error('Error al actulizar le usuario:', error);
        });
      }
    }
  
  
  
    private userService = inject(UserService);
  
    nombreCompleto: string = '';
    usuariosFiltrados: User[] = [];
    personas$!: Observable<User[]>;
    
    
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
      errorMessage: string = '';
    
      passwordsMatch(): boolean {
        return this.user.contrasena === this.confirmacionContrasena;
      }
      fieldsAreValid(): boolean {
        return !!(
          this.user.nombre &&
          this.user.apellido &&
          this.user.cedula &&
          this.user.contrasena &&
          this.user.fechaNacimiento &&
          this.user.genero &&
          this.user.direccion &&
          this.user.correo &&
          this.user.telefono
        );
      }
    
      saveUser(): void {
        if (!this.fieldsAreValid()) {
          this.errorMessage = 'Todos los campos son obligatorios.';
          return;
        }
    
        if (!this.passwordsMatch()) {
          this.errorMessage = 'Las contraseñas no coinciden.';
          return;
        }
    
        this.userService.saveUser(this.user)
          .subscribe({
            next: (response) => {
              console.log('Usuario guardado correctamente', response);
              this.closeModal();
              this.errorMessage = '';
            },
            error: (error) => {
              console.error('Error al guardar el usuario', error);
            }
          });
      }
    
      
    
      showEditModal(user: User) {
        this.user = { ...user };
        this.confirmacionContrasena = this.user.contrasena;
        this.modalVisible = true;
        this.errorMessage = ''; 
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
  
  
    openModalAgregar() {
      this.modalVisibleA = true;
      console.log("abrir")
    }
  
    closeModal() {
      this.modalVisible = false;
      this.modalVisibleA = false;
    }
  
    openModal(user: User) {
      this.selectedUserId = user.idUsuario;
      this.userForm.patchValue(user);
      this.modalVisible = true;
    }
  
     
  
    /* ------------------------------------------------------------------------- */
  
    getProfileImage(idUsuario: number): string {
      return `https://picsum.photos/id/${idUsuario}/200/200`;
    }
  
  
    /* ------------------------------------------------------------------------- */
  
    // menuVisible: boolean = false;
  
    // toggleMenu() {
    //   this.menuVisible = !this.menuVisible;
    // }
    
    /* ------------------------------------------------------------------------- */
  
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

