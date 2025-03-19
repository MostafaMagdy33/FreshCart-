import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../base/base-url';
import { checkOutForm } from '../../../addtocart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private _HttpClient: HttpClient) {}

  getCheckOutVisa(cartId: string, userForm: checkOutForm): Observable<any> {
    return this._HttpClient.post(
      `${env.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4000`,
      userForm
    );
  }
  getCheckOutCash(cartId: string, userForm: checkOutForm): Observable<any> {
    return this._HttpClient.post(`${env.baseUrl}/orders/${cartId}`, userForm);
  }
}
