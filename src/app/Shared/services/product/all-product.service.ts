import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { env } from '../../base/base-url';

@Injectable({
  providedIn: 'root',
})
export class AllProductService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${env.baseUrl}/products`);
  }
  getSpecificProduct(id: string): Observable<any> {
    return this._HttpClient.get(`${env.baseUrl}/products/${id}`);
  }
  getAllCagtegories(): Observable<any> {
    return this._HttpClient.get(`${env.baseUrl}/categories`);
  }
}
