import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroNivelPage } from './filtro-nivel.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroNivelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroNivelPageRoutingModule {}
