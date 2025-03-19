import { HttpClient } from '@angular/common/http';
import { Injectable , signal } from '@angular/core';
import { env } from '../../base/base-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  numOfCartItemsUser: any = signal(0);

  constructor(private _HttpClient: HttpClient) {}

  addToCart(id: string) {
    return this._HttpClient.post(`${env.baseUrl}/cart`, { productId: id });
  }
  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${env.baseUrl}/cart`);
  }
  UpdateCartProductQuantity(id: string, pCount: number): Observable<any> {
    return this._HttpClient.put(`${env.baseUrl}/cart/${id}`, { count: pCount });
  }
  removeItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${env.baseUrl}/cart/${id}`);
  }
}
