import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { SignInData } from '../../../sign-up-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { env } from '../../base/base-url';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  isUserLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userName: BehaviorSubject<string> = new BehaviorSubject('');
  _platformId = inject(PLATFORM_ID);
  constructor(private _HttpClient: HttpClient) {
    if (isPlatformBrowser(this._platformId)) {
      if (localStorage.getItem('UserToken') !== null) {
        this.veriryToken(localStorage.getItem('UserToken')).subscribe({
          next: (res) => {
            console.log(res);
            this.isUserLogin.next(true);
            let tokenName: string = JSON.stringify(
              localStorage.getItem('UserToken')
            );
            let decode: any = jwtDecode(tokenName);
            this.userName.next(decode.name);
          },
          error: (error) => {
            console.info(error);
            this.isUserLogin.next(false);
            this.userName.next('');
          },
        });
      }
    }
  }
  signIn(User: SignInData): Observable<any> {
    return this._HttpClient.post(`${env.baseUrl}/auth/signin`, User);
  }
  veriryToken(UserT: any): Observable<any> {
    return this._HttpClient.get(`${env.baseUrl}/auth/verifyToken`, {
      headers: {
        token: UserT,
      },
    });
  }
}
