import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  checkout(cartItems: any) {
    return this.http.post(
      environment.API_URL + '/products/checkout',
      {
        cartItems,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getProduct(id: number) {
    return this.http.get(environment.API_URL + '/products/' + id, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getAll() {
    return this.http.get(environment.API_URL + '/products', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
