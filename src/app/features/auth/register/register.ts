import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule , FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

export class Register {

   firstName: string = '';
   lastName: string = '';
   email: string = '';
   password: string = '';
   role: number = 0 ;
   isRegistered: boolean = false;
   message: string = '';

   constructor(
    private router: Router ,
    private authservice: AuthService
   ){}


   Register(){

        this.authservice.register({

          firstName: this.firstName,
          lastName: this.lastName ,
          email: this.email,
          password: this.password,
          role: this.role

     }).subscribe({
          next : (res) => {
            this.isRegistered = true;
            this.message = 'You registered with success!'
            this.router.navigate(['/login'])
          },
          error : () => {
            this.isRegistered = false;
            this.message = 'You are not registered something went wrong !';
          }
     })
   }

}
