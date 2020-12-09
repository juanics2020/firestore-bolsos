import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//const routes: Constante donde van definidas todas las rutas
//path: dirección
//redirectTo: redirecciones a páginas
//loadChildren: donde se define el módulo de la página a la que vamos a dirigir
//El primer path es el punto de entrada (home)
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ver-articulo',
    loadChildren: () => import('./ver-articulo/ver-articulo.module').then( m => m.VerArticuloPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
