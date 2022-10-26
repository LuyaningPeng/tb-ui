import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from '@home/pages/three/test/test.component';

const routes: Routes = [
  {path: 'test', component: TestComponent},
  {
    path: '**', redirectTo: '/test', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeRoutingModule { }
