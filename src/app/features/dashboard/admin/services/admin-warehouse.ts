import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseRequestDTO, WarehouseResponseDTO } from '../../../../core/model/warehouse.model';
import { ADMIN_API } from '../../../../api/admin.api';

@Injectable({
  providedIn: 'root',
})
export class AdminWarehouse {
   
  private http = inject(HttpClient)        

  getAllWarehouses(): Observable<WarehouseResponseDTO[]>{
    return this.http.get<WarehouseResponseDTO[]>(ADMIN_API.WAREHOUSES);
  }

  getWarehouseById(id: number): Observable<WarehouseResponseDTO>{
    return this.http.get<WarehouseResponseDTO>(`${ADMIN_API.WAREHOUSES}/${id}`)
  }

  createWarehouse(warehouse: WarehouseRequestDTO): Observable<WarehouseResponseDTO>{
    return this.http.post<WarehouseResponseDTO>(ADMIN_API.WAREHOUSES , warehouse);
  }

  updateWarehouse(id:number , warehouse: WarehouseRequestDTO): Observable<WarehouseResponseDTO>{
    return this.http.put<WarehouseResponseDTO>(`${ADMIN_API.WAREHOUSES}/${id}` , warehouse)
  }

  deleteWarehouse(id: number): Observable<void>{
    return this.http.delete<void>(`${ADMIN_API.WAREHOUSES}/${id}`)
  }

  activateWarehouse(id: number): Observable<WarehouseResponseDTO>{
    return   this.http.patch<WarehouseResponseDTO>(`${ADMIN_API.WAREHOUSES}/${id}/activate`,{})
  }

  searchWarehouses(searchItem: string): Observable<WarehouseResponseDTO[]>{
    let params = new HttpParams();
    if(searchItem){
      params = params.set('search' , searchItem);
    }

    return this.http.get<WarehouseResponseDTO[]>(`${ADMIN_API.WAREHOUSES}/search`, {params})
  }
}
