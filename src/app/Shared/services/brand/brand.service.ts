import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../base/base-url';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private _HttpClient: HttpClient) {}

  getAllBrand(): Observable<any> {
    return this._HttpClient.get(`${env.baseUrl}/brands`);
  }
}
