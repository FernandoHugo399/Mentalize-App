import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Publish } from '../interfaces/publish';
import { map} from 'rxjs/operators';
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

  getPublishs() {
    return this.publishCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        }))
    );
  }

  async addPublish(publish: Publish, file: File) {
    this.authService.getAuth().user.subscribe( res => publish.id_usuario = res.uid);
    await this.firestorage.upload('/publish/' + publish.imagem, file);
    await this.publishCollection.add(publish);
  }
}
