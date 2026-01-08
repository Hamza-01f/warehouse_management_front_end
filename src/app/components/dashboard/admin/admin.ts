import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminDashboard implements OnInit {
   
   user!: LoginResponse | null;

  constructor(private authservice: AuthService){}

  ngOnInit(): void {
    this.user = this.authservice.getUser();
  }

}
