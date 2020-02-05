import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { defineBase } from '@angular/core/src/render3';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';



export interface Reading { name: string; price: number; }
export interface ReadingId extends Reading { id: string; }



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  private readingCollection: AngularFirestoreCollection<Reading>;
  readings: Observable<ReadingId[]>;


  constructor(private readonly afs: AngularFirestore) {
    this.readingCollection = afs.collection<Reading>('/aaa');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.readings = this.readingCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reading;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}