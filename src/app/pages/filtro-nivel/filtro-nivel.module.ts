import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroNivelPageRoutingModule } from './filtro-nivel-routing.module';

import { FiltroNivelPage } from './filtro-nivel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroNivelPageRoutingModule
  ],
  declarations: [FiltroNivelPage]
})
export class FiltroNivelPageModule {}
