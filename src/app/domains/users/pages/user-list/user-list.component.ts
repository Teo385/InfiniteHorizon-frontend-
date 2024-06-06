import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { HttpClient } from '@angular/common/http';


 
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export default class UserListComponent {
  @Input({required: true}) user!: User;

  users = signal<User[]> ([]);
  private userService = inject(UserService);
  


  private getUsers () {
    this.userService.getUsers().
    subscribe({
      next: (users) => {
        this.users.set(users);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  ngAfterViewInit(){
    this.getUsers();
  }

  // getProfileImage(): string {
  //   return `https://picsum.photos/id/${this.getRandomInt(1,1000)}/200/200`;;
  // }

  // getRandomInt(min: number, max: number): number {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  constructor(private http: HttpClient) {
    this.http.get<User[]>('http://localhost:8080/api/usuario/all')
      .subscribe((users: User[]) => {
        users.forEach((user: User) => {
          const profileImageUrl = this.getProfileImage(user.idUsuario);
          console.log('URL de la imagen de perfil:', profileImageUrl);
        });
      });
  } 

  getProfileImage(idUsuario: number): string {
    return `https://picsum.photos/id/${idUsuario}/200/200`;
  }

  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  



}
  

  
  





