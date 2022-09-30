import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  createDoc(data: any, path: string, id: any){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId(){
    return this.firestore.createId();
  }

  getCollection<tipo>(path:string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id: string){
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  getCollectionAsc<tipo>(path: string, attribute: string){

    const dataCollection: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path, ref => ref.orderBy(attribute, 'asc'));

    return dataCollection.valueChanges();

  }
}
