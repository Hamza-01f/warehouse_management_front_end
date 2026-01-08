import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
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
  isError: boolean = false;

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
          const user = res.data;
          localStorage.setItem('access_token' , user.accessToken);
          this.message = 'You logged In with success ! ';

          this.authService.setUser({
              accessToken: user.accessToken,
              expiresIn: user.expiresIn,
              refreshToken: user.refreshToken,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role
            });

          if(user.role == 'ADMIN'){

            this.router.navigate(['/dashboard/admin']);

          }
          if(user.role == 'WAREHOUSE_MANAGER' ){
            this.router.navigate(['/dashboard/manager']);
          }
          if(user.role == 'CLIENT'){
            this.router.navigate(['/dashboard/client']);
          }
        },

        error: () => {
          this.isError = true;
          this.message = 'Invalid Credentials ! ';
          this.loading = false;  
        }
      })
  }
}
