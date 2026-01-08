import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../model/login-request.model';
import { Router } from '@angular/router';
import { RegisterRequest } from '../model/register-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  
  private LOGIN_URL = 'http://localhost:8090/api/auth/login';
  private REGISTER_URL = 'http://localhost:8090/api/auth/register';

  private userSubject = new BehaviorSubject<LoginResponse | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private route: Router ,
              private http: HttpClient){}

  login(request: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(this.LOGIN_URL, request);
  }

  logout(){
     localStorage.clear();
     this.userSubject.next(null);
  }

  isAuthenticated(): boolean{
      return !! localStorage.getItem('access_token');
  }

  register(register: RegisterRequest): Observable<RegisterResponse>{
      return this.http.post<RegisterResponse>(this.REGISTER_URL , register)
  }

  setUser(response: LoginResponse){
      this.userSubject.next(response);
  }

  getUser(): LoginResponse | null{
     if(this.userSubject.value){
      return this.userSubject.value;
     }
     return null;
  }


}
