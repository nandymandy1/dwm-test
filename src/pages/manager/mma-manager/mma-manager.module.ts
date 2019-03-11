import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MmaManagerPage } from './mma-manager';

@NgModule({
  declarations: [
    MmaManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(MmaManagerPage),
  ],
})
export class MmaManagerPageModule {}
