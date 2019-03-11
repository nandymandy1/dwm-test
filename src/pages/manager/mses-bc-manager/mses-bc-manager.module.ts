import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsesBcManagerPage } from './mses-bc-manager';

@NgModule({
  declarations: [
    MsesBcManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(MsesBcManagerPage),
  ],
})
export class MsesBcManagerPageModule {}
