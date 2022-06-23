import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public path = 'http://10.25.61.243:3200/api/';
  constructor(private http: HttpClient) { }

  public saveProduct(product: any) {
    return this.http.post<any>(this.path + 'products', product);
  }

  public getProducts(): any {
    return this.http.get(this.path + `products`);
  }

  public updateProduct(id: any, product: any) {
    return this.http.patch<any>(this.path + `products?productid=${id}`, product);
  }

  public deleteProduct(id: any) {
    return this.http.delete<any>(this.path + `products/${id}`);
  }
}
