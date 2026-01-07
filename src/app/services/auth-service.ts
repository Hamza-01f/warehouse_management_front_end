import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/login-request.model';


interface LoginResponse{
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private API_URL = 'http://localhost:8090/api/auth/login'

  constructor(private http: HttpClient){}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API_URL, request);
  }

  logout(){
     localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean{
      return !! localStorage.getItem('access_token');
  }

  register(){

  }
}
