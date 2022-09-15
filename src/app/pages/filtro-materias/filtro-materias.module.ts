import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroMateriasPageRoutingModule } from './filtro-materias-routing.module';

import { FiltroMateriasPage } from './filtro-materias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroMateriasPageRoutingModule
  ],
  declarations: [FiltroMateriasPage]
})
export class FiltroMateriasPageModule {}
