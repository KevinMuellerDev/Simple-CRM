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
          this.users.push(this.setUserObject(user.data(), user.id));
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


  setUserObject(obj:any, id: string){
    return {
      id: id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      birthDate: obj.birthDate,
      street: obj.street,
      zipCode: obj.zipCode,
      city: obj.city	
    }
  }
}
