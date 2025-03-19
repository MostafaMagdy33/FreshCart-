import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // Only run the logic if it's the browser environment
  if (isPlatformBrowser(platformId)) {
    const token: any = localStorage.getItem('UserToken');

    if (token !== null) {
      // Clone the request and add the  header
      const updatedReq = req.clone({
        setHeaders: {
          token: token,
        },
      });

      return next(updatedReq);
    }
  }

  // If no token or not in the browser, pass the request unchanged
  return next(req);
};
