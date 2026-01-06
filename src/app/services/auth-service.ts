import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface LoginResponse{
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private API_URL = 'http://localhost:8090/api/auth/login'

  constructor(private http: HttpClient){}

  login(email: string, password: string): Observable<LoginResponse> {
    console.log("i am in the service");
    return this.http.post<LoginResponse>(this.API_URL, {
      email,
      password
    });
  }

  logout(){
     localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean{
      return !! localStorage.getItem('access_token');
  }
}
