import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolicySheetManagerPage } from './policy-sheet-manager';

@NgModule({
  declarations: [
    PolicySheetManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(PolicySheetManagerPage),
  ],
})
export class PolicySheetManagerPageModule {}
