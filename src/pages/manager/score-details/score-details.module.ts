import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScoreDetailsPage } from './score-details';

@NgModule({
  declarations: [
    ScoreDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ScoreDetailsPage),
  ],
})
export class ScoreDetailsPageModule {}
