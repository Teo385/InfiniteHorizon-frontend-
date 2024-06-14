import { Component, inject, Input, signal,  } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default class DashboardComponent {

  
  @Input({required: true}) user!: User;
  
  users = signal<User[]> ([]);
  private userService = inject(UserService);

  // private getUsers () {
  //   this.userService.searchUsers('').
  //   subscribe({
  //     next: (users) => {
  //       this.users.set(users);
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   })
  // }

  private getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users.set(users);
    });
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

  



