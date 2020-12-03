import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerAticuloPageRoutingModule } from './ver-aticulo-routing.module';

import { VerAticuloPage } from './ver-aticulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerAticuloPageRoutingModule
  ],
  declarations: [VerAticuloPage]
})
export class VerAticuloPageModule {}
