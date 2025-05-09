import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({eventCoalescing: true},),
      provideHttpClient(),
      provideRouter(routes),
      importProvidersFrom(NgOptimizedImage)
  ]
};
