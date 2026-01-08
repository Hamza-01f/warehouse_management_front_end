import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {

  constructor(
    private authService: AuthService ,
    private router: Router
  ){
    this.authService.logout()
    this.router.navigate(['/'])
  }

}
