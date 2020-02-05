import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { defineBase } from '@angular/core/src/render3';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';



export interface Shirt { name: string; price: number; }
export interface ShirtId extends Shirt { id: string; }



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  private shirtCollection: AngularFirestoreCollection<Shirt>;
  shirts: Observable<ShirtId[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.shirtCollection = afs.collection<Shirt>('/aaa');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.shirts = this.shirtCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Shirt;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}