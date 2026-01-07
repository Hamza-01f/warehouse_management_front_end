import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/login-request.model';
import { Register } from '../components/register/register';
import { Router } from '@angular/router';
import { User } from '../model/user.model';


interface LoginResponse{
  token: string;
}

interface RegisterResponse{
  firstName: string;
  lastName: string;
  email: string;
  role: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  
  private LOGIN_URL = 'http://localhost:8090/api/auth/login';
  private REGISTER_URL = 'http://localhost:8090/api/auth/register';

  constructor(private route: Router ,
              private http: HttpClient){}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.LOGIN_URL, request);
  }

  logout(){
     localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean{
      return !! localStorage.getItem('access_token');
  }

  register(register: User): Observable<RegisterResponse>{
      return this.http.post<RegisterResponse>(this.REGISTER_URL , register)
  }


}
