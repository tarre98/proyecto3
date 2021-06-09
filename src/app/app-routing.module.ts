import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'libros/:useridInput',
    loadChildren: () => import('./libros/libros.module').then( m => m.LibrosPageModule)
  },
  {
    path: 'usuario-info/:useridInput',
    loadChildren: () => import('./usuario-info/usuario-info.module').then( m => m.UsuarioInfoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
