import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { User } from '../../../core/model/user.model';
import { Sidebar } from '../../../core/shared/layout/sidebar/sidebar';
import { AdminHome } from './children/home/home';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [Sidebar , RouterOutlet],
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
