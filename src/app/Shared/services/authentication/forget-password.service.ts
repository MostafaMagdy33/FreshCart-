import {
  changePassword,
  code,
  resetPasswordUser,
  SignInData,
} from './../../../sign-up-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { env } from '../../base/base-url';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService {
  checkVerify: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private _HttpClient: HttpClient) {}

  ForgotPassword(email: SignInData): Observable<any> {
    return this._HttpClient.post(`${env.baseUrl}/auth/forgotPasswords`, email);
  }
  verifyCode(code: code) {
    return this._HttpClient.post(`${env.baseUrl}/auth/verifyResetCode`, code);
  }
  resetPassword(nPassword: resetPasswordUser) {
    return this._HttpClient.put(`${env.baseUrl}/auth/resetPassword`, nPassword);
  }
  updateLoggeduserPassword(formToChangePassword: changePassword) {
    return this._HttpClient.put(
      `${env.baseUrl}/users/changeMyPassword`,
      formToChangePassword
    );
  }
}
