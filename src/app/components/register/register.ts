import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

   
}
