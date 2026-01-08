import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {


  constructor(private auth: AuthService ,
              private router: Router
  ){}

  
  decideWhereToGo(value: string){
    const role = this.auth.getRole()?.toLowerCase();
    this.router.navigate([`/dashboard/${role}/${value}`])
  }

}
