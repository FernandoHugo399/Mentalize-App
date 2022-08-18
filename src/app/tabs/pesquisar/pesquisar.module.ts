import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PesquisarPage } from './pesquisar.page';

import { PesquisarPageRoutingModule } from './pesquisar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PesquisarPageRoutingModule
  ],
  declarations: [PesquisarPage]
})
export class PesquisarPageModule {}
