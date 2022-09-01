import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesCollection: AngularFirestoreCollection<Message>;

  constructor(private afs: AngularFirestore) {
    this.messagesCollection = this.afs.collection<Message>('Messages');
  }

  getMessages() {
    return this.messagesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        }))
    );
  }

  addMessage(message: Message) {
    return this.messagesCollection.add(message);
  }
}
