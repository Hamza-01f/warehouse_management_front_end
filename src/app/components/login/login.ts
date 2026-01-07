import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  email: string = '';
  password: string = '';
  message: string = '';
  loading: boolean = false;
  isError: boolean = false;;

  constructor(
    private authService: AuthService ,
    private router: Router
  ){}

  login(){

      this.loading = true;
      this.message = '';
      this.isError = false;

      this.authService.login({
        email: this.email ,
         password: this.password
        }).subscribe({

        next: (res) => {
          localStorage.setItem('access_token' , res.token);
          this.message = 'You logged In with success ! ';
          this.router.navigate(['/dashboard/admin'])
        },

        error: () => {
          this.isError = true;
          this.message = 'Invalid Credentials ! ';
          this.loading = false;  
        }
      })
  }
}
