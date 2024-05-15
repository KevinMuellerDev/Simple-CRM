import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

  constructor() { }

  async addUser(user: any) {
    const docRef = await addDoc(collection(this.firestore, 'users'), user)
      .catch(err => console.error(err))
      .then(() => {
        console.log('adding user finished', user);
      })
  }

}
