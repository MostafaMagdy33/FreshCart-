import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../base/base-url';


@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  _PLATFORM_ID = inject(PLATFORM_ID);
  numofWishList = signal(0);
  constructor(private _HttpClient: HttpClient) {}

  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(`${env.baseUrl}/wishlist`, { productId: id });
  }

  getLoggedUserWishList(): Observable<any> {
    return this._HttpClient.get(`${env.baseUrl}/wishlist`);
  }

  removeProductFromWishList(id: string): Observable<any> {
    return this._HttpClient.delete(`${env.baseUrl}/wishlist/${id}`);
  }
}
