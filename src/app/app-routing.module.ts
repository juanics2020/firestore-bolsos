import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  //Variables que pasamos a la segunda página(nombre que le damos id y tipo)
  { path: "ver-articulo/:id/:tipo", loadChildren: "./ver-articulo/ver-articulo.module#VerArticuloPageModule" },
  {
    path: 'descripcion',
    loadChildren: () => import('./descripcion/descripcion.module').then( m => m.DescripcionPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
