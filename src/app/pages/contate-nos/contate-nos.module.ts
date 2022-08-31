import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContateNosPageRoutingModule } from './contate-nos-routing.module';

import { ContateNosPage } from './contate-nos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContateNosPageRoutingModule
  ],
  declarations: [ContateNosPage]
})
export class ContateNosPageModule {}
