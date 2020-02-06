import { Component, AfterViewInit } from '@angular/core';

import * as Prism from 'prismjs';
import { map } from 'rxjs/operators';
import { defineBase } from '@angular/core/src/render3';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Chart } from 'chart.js';
import * as firebase from 'firebase';


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
  items: Observable<any[]>;
  leak: any;
  f1: AngularFireObject<any>;
  chart: any;
  text: any;
  bc: boolean = false;
  

  calculation(string1,string2, string3) {
    this.leak = parseFloat(string1) - ( parseFloat(string2) + parseFloat(string3));
   if(this.leak > 2 ){
     this.leak = Math.abs(this.leak);
     this.text = "LEAK DETECTED";
     this.bc =true;
    }
    else{
      this.leak = 0;
      this.text = "NO LEAK DETECTED"
      this.bc = false;
    
    }
    return Math.round( this.leak );
  }
  constructor(afs: AngularFireDatabase) {
    //this.readingCollection = afs.collection<Reading>('/aaa');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    //Observable<any> f1 = afs.object('/').valueChanges();

    this.items = afs.list('/').valueChanges();
    this.items = afs.list('/', ref => ref.limitToLast(15)).valueChanges();

    //console.log(parseFloat(this.items[0].flow3) );

    /*const itemsRef = firebase.database().ref('/');
    const ref = itemsRef.endAt(1);
    
    ref.once('value').then(function(snap) {
      snap.forEach(function (childSnap) {
        const pkey = childSnap.key;
        console.log(pkey);*/
   //this.items = afs.list('/').valueChanges();

   // this.readings = this.readingCollection.snapshotChanges().pipe(
    //  map(actions => actions.map(a => {
      //  const data = a.payload.doc.data() as Reading;
        //const id = a.payload.doc.id;
        //return { id, ...data };
     // }))
    //);
  //});
//});

this.chart = new Chart('canva', {
  type: 'line',
data: {
    labels: ['6', '12', '18', '24', '30', '36', '42', '48', '54', '60'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
},
options: {
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
}
});
  }
  
}
