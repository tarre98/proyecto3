import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioInfoPageRoutingModule } from './usuario-info-routing.module';

import { UsuarioInfoPage } from './usuario-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioInfoPageRoutingModule
  ],
  declarations: [UsuarioInfoPage]
})
export class UsuarioInfoPageModule {}
