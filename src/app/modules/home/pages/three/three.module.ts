import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeRoutingModule } from './three-routing.module';
import {SharedModule} from '@shared/shared.module';
import {HomeComponentsModule} from '@home/components/home-components.module';
import { TestComponent } from './test/test.component';
import { ThreeMainComponent } from './three-main/three-main.component';


@NgModule({
  declarations: [
    TestComponent,
    ThreeMainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeComponentsModule,
    ThreeRoutingModule
  ]
})
export class ThreeModule { }
