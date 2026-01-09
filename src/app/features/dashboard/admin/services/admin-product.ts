import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../core/model/product.model';
import { ADMIN_API } from '../../../../api/admin.api';

@Injectable({
  providedIn: 'root',
})
export class AdminProduct {

  constructor(private http: HttpClient){}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(ADMIN_API.PRODUCTS);
  }

  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ADMIN_API.PRODUCTS}/active`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${ADMIN_API.PRODUCTS}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(ADMIN_API.PRODUCTS, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${ADMIN_API.PRODUCTS}/${id}`, product);
  }

  activateProduct(id: number): Observable<void> {
    return this.http.patch<void>(`${ADMIN_API.PRODUCTS}/${id}/activate`, {});
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${ADMIN_API.PRODUCTS}/${id}`);
  }
}
