import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Managers } from '../../../../core/model/user.model';
import { ADMIN_API } from '../../../../api/admin.api';

@Injectable({
  providedIn: 'root',
})
export class AdminUser {
  
  private http = inject(HttpClient);

  getManagers(): Observable<Managers[]>{
    return this.http.get<Managers[]>(`${ADMIN_API.USERS}/managers`);
  }
}
