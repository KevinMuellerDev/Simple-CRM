import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { Environment } from './environment';





export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"simple-crm-dfd4a",
      "appId":"1:458563173555:web:f2093ee933803f496e04c6",
      "storageBucket":"simple-crm-dfd4a.appspot.com",
      "apiKey":Environment.API_KEY,
      "authDomain":"simple-crm-dfd4a.firebaseapp.com",
      "messagingSenderId":"458563173555"})), 
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())]
};
