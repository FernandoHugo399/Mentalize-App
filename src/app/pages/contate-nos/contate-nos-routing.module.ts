import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContateNosPage } from './contate-nos.page';

const routes: Routes = [
  {
    path: '',
    component: ContateNosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContateNosPageRoutingModule {}
