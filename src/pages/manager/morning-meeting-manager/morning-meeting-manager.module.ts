import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorningMeetingManagerPage } from './morning-meeting-manager';

@NgModule({
  declarations: [
    MorningMeetingManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(MorningMeetingManagerPage),
  ],
})
export class MorningMeetingManagerPageModule {}
