import { CanActivateFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../../../services/authentication/sign-in.service';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

export const logOutGuard: CanActivateFn = (route, state) => {
  let _SignInService = inject(SignInService);
  let _Router = inject(Router);
  let _ToastrService = inject(ToastrService);
  let _PLATFORM_ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('UserToken') == null) {
      return true;
    } else {
      _ToastrService.info('You are already signed in');
      _Router.navigate(['/home']);
      return false;
    }
  } else {
    return true;
  }
};
