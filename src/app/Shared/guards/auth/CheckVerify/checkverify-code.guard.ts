import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ForgetPasswordService } from '../../../services/authentication/forget-password.service';

export const checkverifyCodeGuard: CanActivateFn = (route, state) => {
  let _ForgetPasswordService = inject(ForgetPasswordService);

  if (_ForgetPasswordService.checkVerify.value) {
    return true;
  } else {
    return false;
  }
};
