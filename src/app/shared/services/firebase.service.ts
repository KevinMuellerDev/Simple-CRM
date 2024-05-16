import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

  unsubGuests;

  users:any[] = [];

  constructor() { 
    this.unsubGuests = this.getUserData();
  }

  getUserData() {
    return onSnapshot(this.getUsersRef(), (currentUsers) => {
      this.users = [];
      currentUsers.forEach((user) => {
          this.users.push(user.data());
      });
      console.log(this.users);
    });
  }

  async addUser(user: any) {
    const docRef = await addDoc(this.getUsersRef(), user)
      .catch(err => console.error(err))
      .then(() => {
        console.log('adding user finished', user);
      })
  }

  getUsersRef() {
    return collection(this.firestore, 'users')
  }

}
