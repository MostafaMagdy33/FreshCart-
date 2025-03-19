import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {  BrowserAnimationsModule, provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './Shared/interceptors/token.interceptor';
import { loaderscreenInterceptor } from './Shared/interceptors/loaderscreen.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay() ),
    provideHttpClient(withFetch() ,withInterceptors([ tokenInterceptor , loaderscreenInterceptor])),
    provideAnimations(),
    provideNoopAnimations(),
    provideToastr({
      timeOut: 1000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar:true,

    }),
    BrowserAnimationsModule,


  ]}


