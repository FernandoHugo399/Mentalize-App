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
    private firestorage: AngularFireStorage
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

  async addPublish(publish: Publish) {
    const filterPublish = this.filterPublish(publish);

    try {
      await this.firestorage.upload('/publish/' + filterPublish.imagem, publish.file);

      await this.publishCollection.add(filterPublish);
    } catch (error) {
      console.log(error);
    }
  }

  private filterPublish(publish: Publish): Publish {
    const format = publish.file.name.split('.');

    return{
      titulo: publish.titulo.trim(),
      descricao: publish.descricao.trim(),
      materia: publish.materia,
      nivelEnsino: publish.nivelEnsino,
      imagem: Date.now() + format[0],
      dataPublicacao: Date.now().toString()
    };
  }
}
