import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { VerArticuloPage } from './ver-articulo.page';

//El path hacia bolsos ahora puede llevar un id
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  { path: "bolsos/:id", loadChildren: "./bolsos/bolsos.module#VerArticuloPageModule" },
  {
    path: '',
    component: VerArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class VerArticuloPageRoutingModule {}
