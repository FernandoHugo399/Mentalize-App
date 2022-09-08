import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilOutroUsuarioPageRoutingModule } from './perfil-outro-usuario-routing.module';

import { PerfilOutroUsuarioPage } from './perfil-outro-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilOutroUsuarioPageRoutingModule
  ],
  declarations: [PerfilOutroUsuarioPage]
})
export class PerfilOutroUsuarioPageModule {}
