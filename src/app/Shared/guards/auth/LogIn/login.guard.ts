import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SignInService } from '../../../services/authentication/sign-in.service';
import { isPlatformBrowser } from '@angular/common';
import { catchError, EMPTY, first, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {
  let _SignInService = inject(SignInService);
  let _Router = inject(Router);
  let _PLATFORM_ID = inject(PLATFORM_ID);
  let _ToastrService = inject(ToastrService);
  if (isPlatformBrowser(_PLATFORM_ID)) {
    return _SignInService.veriryToken(localStorage.getItem('UserToken')).pipe(
      first(),
      map((res) => {
        if (res.message === 'verified') {
          return true;
        } else {
          _SignInService.isUserLogin.next(false);
          _Router.navigate(['/signIn']);
          return false;
        }
      }),
      catchError((error) => {
        _SignInService.isUserLogin.next(false);
        _ToastrService.info('Sign in First');
        console.error('loginGuard', error);
        _Router.navigate(['/signIn']);
        return EMPTY;
      })
    );
  } else {
    return true;
  }
};
