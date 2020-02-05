import { Component, AfterViewInit } from '@angular/core';

import * as Prism from 'prismjs';
import { map } from 'rxjs/operators';
import { defineBase } from '@angular/core/src/render3';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Chart } from 'chart.js';



export interface Reading { name: string; price: number; }
export interface ReadingId extends Reading { id: string; }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
  }

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
