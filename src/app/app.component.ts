import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { defineBase } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  public customLayout: boolean;
  title = "Water Leak Detection System";
  itemValue = "";
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase){
    //private layoutService: LayoutService
    this.items = db.list('/').valueChanges();
  }

  
}
