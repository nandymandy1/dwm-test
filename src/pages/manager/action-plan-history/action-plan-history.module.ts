import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionPlanHistoryPage } from './action-plan-history';

@NgModule({
  declarations: [
    ActionPlanHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ActionPlanHistoryPage),
  ],
})
export class ActionPlanHistoryPageModule {}
