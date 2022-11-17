import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from '@home/pages/three/test/test.component';
import {ThreeMainComponent} from '@home/pages/three/three-main/three-main.component';

const routes: Routes = [
  {path: 'test', component: TestComponent},
  {path: 'three', component: ThreeMainComponent},
  {
    path: '**', redirectTo: '/test', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeRoutingModule { }
