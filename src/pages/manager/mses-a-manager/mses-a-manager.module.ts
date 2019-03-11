import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsesAManagerPage } from './mses-a-manager';

@NgModule({
  declarations: [
    MsesAManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(MsesAManagerPage),
  ],
})
export class MsesAManagerPageModule {}
