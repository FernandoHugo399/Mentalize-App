import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilOutroUsuarioPage } from './perfil-outro-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilOutroUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilOutroUsuarioPageRoutingModule {}
