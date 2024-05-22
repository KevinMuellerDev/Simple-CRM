import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { keepUnstableUntilFirst } from '@angular/fire';
import { Firestore, Unsubscribe, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc, where } from '@angular/fire/firestore';
import { UnsubscriptionError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

  unsubGuests;

  users: any[] = [];
  profileData: any[] = [];
  products: any[] = [];
  id: any;

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

  async getProductData(id?: any) {
    const querySnapshot = await getDocs(collection(this.firestore, 'users', id, 'sales'));
    this.products = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      this.products.push(this.setProductObject(doc.data(), doc.id))
    });
  }

  async getProfileData(id?: any) {
    this.profileData = [];
    const docRef = doc(this.firestore, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.profileData.push(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }


  async addUser(user: any) {
    const docRef = await addDoc(this.getUsersRef(), user)
      .catch(err => console.error(err))
      .then(() => {
        console.log('adding user finished', user);
      })
  }

  async addProduct(id:any, content:any){
    const docRef = await addDoc(this.getUserSalesRef(id), content)
      .catch(err => console.error(err))
      .then(() => {
        console.log('adding user finished', content);
      })
  }

  async updateUser(id: any, user: any) {
    let docRef = doc(this.firestore, 'users', id)
    console.log(id)
    await updateDoc(docRef, user)
      .catch(err => console.error(err)
      );
  }



  getUsersRef() {
    return collection(this.firestore, 'users')
  }

  getProfileRef(id: any) {
    return (this.getUsersRef(), id)
  }

  getUserSalesRef(id: any) {
    return collection(this.firestore, 'users', id, 'sales')
  }

  setUserObject(obj: any, id: string) {
    return {
      id: id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      birthDate: obj.birthDate,
      street: obj.street,
      zipCode: obj.zipCode,
      city: obj.city,
      profilePicture: obj.profilePicture
    }
  }

  setProductObject(obj: any, id: string) {
    return {
      id: id,
      product: obj.product,
      price: obj.price
    }
  }

  ngOnDestroy() {
    this.unsubGuests();
  }
}
