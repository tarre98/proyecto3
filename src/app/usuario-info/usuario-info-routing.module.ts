import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioInfoPage } from './usuario-info.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioInfoPageRoutingModule {}
