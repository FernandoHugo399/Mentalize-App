import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<User>;
  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore) {
      this.userCollection = this.afs.collection<User>('User');
     }

  async login(user: User) {
    //try {
      const request = await this.auth.signInWithEmailAndPassword(user.email, user.password);
      const uid = request.user.uid;
      this.userCollection.doc(uid).get();
    //} catch (error) {
    //  console.log(error);
    //}
  }

  async register(user: User) {
    //try {
      const request = await this.auth.createUserWithEmailAndPassword(user.email, user.password);
      const uid = request.user.uid;
      this.userCollection.doc(uid).set(user);
    //} catch (error) {
    //  console.log(error);
    //}

  }

  logout() {
    return this.auth.signOut();
  }

  getAuth() {
    return this.auth;
  }
}
