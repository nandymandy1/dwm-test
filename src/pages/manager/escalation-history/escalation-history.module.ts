import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscalationHistoryPage } from './escalation-history';

@NgModule({
  declarations: [
    EscalationHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(EscalationHistoryPage),
  ],
})
export class EscalationHistoryPageModule {}
