import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PerfilPage } from './perfil.page';
import { PerfilPageRoutingModule } from './perfil-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage]
})
export class PerfilModule { }
