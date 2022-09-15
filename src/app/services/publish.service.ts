import { Publish } from './../interfaces/publish';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PublishService {
  private publishCollection: AngularFirestoreCollection<Publish>;

  constructor(
    private firestore: AngularFirestore,
    private firestorage: AngularFireStorage,
    private authService: AuthService
    ) {
    this.publishCollection = this.firestore.collection<Publish>('Publish');
  }

  async getPublishs() {
    const listPublish: Publish[] = [];

    const publish = await this.publishCollection.ref.orderBy('dataPublicacao').get();
    publish.docs.map((e) => {
      const data = e.data();
      const uid = e.id;

      listPublish.push({ uid, ...data });
    });

    return listPublish.reverse();
  }

  async getPublishByMatter(matter: string) {
    const listPublish: Publish[] = [];

    const publish = await this.publishCollection.ref.where('materia', '==', matter).orderBy('dataPublicacao').get();
    publish.docs.map((e) => {
      const data = e.data();
      const uid = e.id;

      listPublish.push({ uid, ...data });
    });

    return listPublish.reverse();
  }

  async getPublishByLevel(level: string) {
    const listPublish: Publish[] = [];

    const publish = await this.publishCollection.ref.where('nivelEnsino', '==', level).orderBy('dataPublicacao').get();
    publish.docs.map((e) => {
      const data = e.data();
      const uid = e.id;

      listPublish.push({ uid, ...data });
    });

    return listPublish.reverse();
  }

  async addPublish(publish: Publish, file: File) {
    this.authService.getAuth().user.subscribe( res => publish.id_usuario = res.uid);
    await this.firestorage.upload('/publish/' + publish.imagem, file);
    await this.publishCollection.add(publish);
  }
}
