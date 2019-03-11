import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SustenanceManagerPage } from './sustenance-manager';

@NgModule({
  declarations: [
    SustenanceManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(SustenanceManagerPage),
  ],
})
export class SustenanceManagerPageModule {}
