import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMonthlyPlanManagerPage } from './view-monthly-plan-manager';

@NgModule({
  declarations: [
    ViewMonthlyPlanManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMonthlyPlanManagerPage),
  ],
})
export class ViewMonthlyPlanManagerPageModule {}
