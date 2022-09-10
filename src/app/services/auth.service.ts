/* eslint-disable new-parens */
import { GoogleAuthProvider } from '@angular/fire/auth';
import { GithubAuthProvider } from '@angular/fire/auth';
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
      const request = await this.auth.signInWithEmailAndPassword(user.email, user.password);
      const uid = request.user.uid;
      this.userCollection.doc(uid).get().subscribe(res => console.log(res.data()));
  }

  async register(user: User) {
      const request = await this.auth.createUserWithEmailAndPassword(user.email, user.password);
      const uid = request.user.uid;
      this.userCollection.doc(uid).set({
        apelido: user.apelido,
        email: user.email,
        genero: user.genero,
        nascimento: user.nascimento,
        nome: user.nome,
        telefone: user.telefone
      });
  }

  logout() {
    return this.auth.signOut();
  }

  getAuth() {
    return this.auth;
  }

  googleSignIn() {
    return this.auth.signInWithPopup(new GoogleAuthProvider);
  }

  githubSignIn() {
    return this.auth.signInWithPopup(new GithubAuthProvider);
  }
}
