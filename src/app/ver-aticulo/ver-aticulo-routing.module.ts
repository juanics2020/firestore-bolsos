import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerAticuloPage } from './ver-aticulo.page';

const routes: Routes = [
  {
    path: '',
    component: VerAticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerAticuloPageRoutingModule {}
