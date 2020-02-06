import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionRoutingModule } from './accordion-routing.module';
import { AccordionComponent } from './accordion.component';

import { AccordionModule as MkAccordionModule, BoxModule } from 'angular-admin-lte';
import { Chart } from 'chart.js';

@NgModule({
  imports: [
    CommonModule,
    AccordionRoutingModule,
    MkAccordionModule,
    BoxModule
  ],
  declarations: [AccordionComponent]
})
export class AccordionModule {

 
  ngOnInit(){}
 }

