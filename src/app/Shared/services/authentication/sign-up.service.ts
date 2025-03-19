import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpData } from '../../../sign-up-data';
import { env } from '../../base/base-url';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private _HttpClient:HttpClient) { }

   singUp(userData:SignUpData):Observable<any> {
  return  this._HttpClient.post(`${env.baseUrl}/auth/signup`, userData);
   }



  }
